import { actions, ILeverageSelected } from '@reducers/leverage'
import {
  synthetics,
  getLeverageVaultPairs,
  effectiveFeeData,
  exchangeAccount
} from '@selectors/exchange'
import { accounts } from '@selectors/solanaWallet'
import { getExchangeProgram } from '@web3/programs/exchange'
import { BN } from '@project-serum/anchor'
import { spawn, all, select, put, call, takeEvery, SagaGenerator } from 'typed-redux-saga'
import { DEFAULT_PUBLICKEY, MAX_U64 } from '@consts/static'
import { createAccount, getWallet, signAllTransaction, sleep } from './wallet'
import { currentlySelected } from '@selectors/leverage'
import { actions as snackbarsActions } from '@reducers/snackbars'
import {
  calculateAmountBorrow,
  calculateAmountCollateral,
  calculateAvailableWithdraw
} from '@consts/borrowUtils'
import { getCRatioFromLeverage } from '@consts/leverageUtils'
import { printBN } from '@consts/utils'
import { assetPrice, vaults, userVaults } from '@selectors/vault'
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import {
  PublicKey,
  sendAndConfirmRawTransaction,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js'
import { Decimal, Vault, VaultEntry } from '@synthetify/sdk/lib/exchange'
import { tou64 } from '@synthetify/sdk/lib/utils'
import { getConnection } from './connection'
import { actions as actionsVault } from '@reducers/vault'
export function* initLeveragePairs(): Generator {
  const syntheticTokens = yield* select(synthetics)
  const tokensAccounts = yield* select(accounts)
  const exchangeProgram = yield* call(getExchangeProgram)
  const leverageVaults = yield* select(getLeverageVaultPairs)

  for (const vault of leverageVaults) {
    const syntheticAccount = tokensAccounts[vault.synthetic.toString()]
    const collateralAccount = tokensAccounts[vault.collateral.toString()]
    const { vaultAddress } = yield* call(
      [exchangeProgram, exchangeProgram.getVaultAddress],
      vault.synthetic,
      vault.collateral,
      vault.vaultType
    )

    if (
      syntheticTokens[vault.collateral.toString()].symbol === 'xUSD' &&
      syntheticTokens[vault.synthetic.toString()].symbol[0] === 'x'
    ) {
      yield* put(
        actions.setShortPair({
          collateralSymbol: syntheticTokens[vault.collateral.toString()].symbol,
          syntheticSymbol: syntheticTokens[vault.synthetic.toString()].symbol,
          collateralBalance: collateralAccount
            ? { val: collateralAccount.balance, scale: collateralAccount.decimals }
            : { val: new BN(0), scale: vault.collateralAmount.scale },
          syntheticBalance: syntheticAccount
            ? { val: syntheticAccount.balance, scale: syntheticAccount.decimals }
            : { val: new BN(0), scale: vault.mintAmount.scale },
          vaultAddress: vaultAddress,
          ...vault
        })
      )
    }
    if (
      syntheticTokens[vault.synthetic.toString()].symbol === 'xUSD' &&
      syntheticTokens[vault.collateral.toString()].symbol[0] === 'x'
    ) {
      yield* put(
        actions.setLongPair({
          collateralSymbol: syntheticTokens[vault.collateral.toString()].symbol,
          syntheticSymbol: syntheticTokens[vault.synthetic.toString()].symbol,
          collateralBalance: collateralAccount
            ? { val: collateralAccount.balance, scale: collateralAccount.decimals }
            : { val: new BN(0), scale: vault.collateralAmount.scale },
          syntheticBalance: syntheticAccount
            ? { val: syntheticAccount.balance, scale: syntheticAccount.decimals }
            : { val: new BN(0), scale: vault.mintAmount.scale },
          vaultAddress: vaultAddress,
          ...vault
        })
      )
    }
  }
}
function* checkVaultEntry(): Generator {
  const wallet = yield* call(getWallet)
  const exchangeProgram = yield* call(getExchangeProgram)
  const currentlySelectedState = yield* select(currentlySelected)
  try {
    yield* call(
      [exchangeProgram, exchangeProgram.getVaultEntryForOwner],
      currentlySelectedState.vaultSynthetic,
      currentlySelectedState.vaultCollateral,
      wallet.publicKey,
      currentlySelectedState.vaultType
    )
    yield* put(actions.setVaultExist({ vaultEntryExist: true }))
  } catch (error) {
    yield* put(actions.setVaultExist({ vaultEntryExist: false }))
  }
}
function* setVaultAddress(): Generator {
  yield* call(checkVaultEntry)
  try {
    const exchangeProgram = yield* call(getExchangeProgram)
    const currentlySelectedState = yield* select(currentlySelected)
    const address = yield* call(
      [exchangeProgram, exchangeProgram.getVaultAddress],
      currentlySelectedState.vaultSynthetic,
      currentlySelectedState.vaultCollateral,
      currentlySelectedState.vaultType
    )
    yield* put(actions.setVaultAddress({ vaultAddress: address.vaultAddress }))
  } catch (error) {
    yield* put(actions.setVaultAddress({ vaultAddress: DEFAULT_PUBLICKEY }))
  }
}

export function* handleOpenLeverage(): Generator {
  const currentlySelectedState = yield* select(currentlySelected)
  try {
    const txids = yield* call(openLeveragePosition, currentlySelectedState)
    for (const txid of txids) {
      yield* put(
        actions.actionDone({
          txid: txid
        })
      )
      yield put(
        snackbarsActions.add({
          message: 'Position has been opened',
          variant: 'success',
          txid: txid,
          persist: false
        })
      )
    }
  } catch (error: any) {
    console.log(error.message.toString())
    yield* put(
      actions.actionFailed({
        error: true
      })
    )
    yield put(
      snackbarsActions.add({
        message:
          error instanceof Error &&
          error.message ===
            'failed to send transaction: Transaction simulation failed: Insufficient funds for fee'
            ? 'Insufficient funds for fee'
            : 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* calculateAmountAfterSwap(
  assetInPrice: BN,
  assetForPrice: BN,
  assetInScale: number,
  assetForScale: number,
  amount: BN,
  effectiveFee: Decimal
): SagaGenerator<BN> {
  const amountOutBeforeFee = assetInPrice.mul(amount).div(assetForPrice)
  const amountAfterFee = amountOutBeforeFee.sub(
    amountOutBeforeFee.mul(effectiveFee.val).div(new BN(10 ** effectiveFee.scale))
  )
  const decimalChange = 10 ** (assetForScale - assetInScale)

  if (decimalChange < 1) {
    return amountAfterFee.div(new BN(1 / decimalChange))
  } else {
    return amountAfterFee.mul(new BN(decimalChange))
  }
}

export function* openLeverage(
  vaultCollateral: PublicKey,
  vaultSynthetic: PublicKey,
  wallet: PublicKey,
  amountToken: BN,
  currentVault: Vault,
  leverage: number,
  fromAddress: PublicKey,
  toAddress: PublicKey,
  cRatio: number
): SagaGenerator<Array<Transaction | TransactionInstruction>> {
  const exchangeProgram = yield* call(getExchangeProgram)
  const userExchangeAccount = yield* select(exchangeAccount)
  const feeData = yield* select(effectiveFeeData)
  let amountCollateral: BN = amountToken
  let sumCollateralAmount: BN = amountToken
  let symulatedSumCollateral: BN = new BN(0)
  let amountSynthetic: BN = new BN(0)
  let sumAmountSynthetic: BN = new BN(0)
  const instructionArray: Array<Transaction | TransactionInstruction> = []
  const collateralDecimal = currentVault.collateralAmount.scale
  let tmp = 0
  const assetPriceState = yield* select(assetPrice)

  symulatedSumCollateral = yield* call(
    calculateAmountAfterSwap,
    assetPriceState[vaultSynthetic.toString()].val,
    assetPriceState[vaultCollateral.toString()].val,
    currentVault.maxBorrow.scale,
    currentVault.collateralAmount.scale,
    calculateAmountBorrow(
      assetPriceState[vaultSynthetic.toString()].val,
      currentVault.maxBorrow.scale,
      assetPriceState[vaultCollateral.toString()].val,
      currentVault.collateralAmount.scale,
      amountCollateral,
      Math.ceil(cRatio).toFixed(15)
    )
      .mul(new BN(10 ** currentVault.openFee.scale))
      .div(currentVault.openFee.val.add(new BN(10 ** currentVault.openFee.scale))),
    feeData.fee
  )

  while (
    amountToken
      .mul(new BN(Number(leverage) * 10 ** collateralDecimal))
      .div(new BN(10 ** collateralDecimal))
      .mul(new BN(Number(0.995) * 10 ** collateralDecimal))
      .div(new BN(10 ** collateralDecimal))
      .gt(sumCollateralAmount.add(symulatedSumCollateral)) &&
    tmp < 10
  ) {
    const depositIx = yield* call([exchangeProgram, exchangeProgram.vaultDepositInstruction], {
      collateral: vaultCollateral,
      synthetic: vaultSynthetic,
      owner: wallet,
      amount: amountCollateral,
      userCollateralAccount: fromAddress,
      reserveAddress: currentVault.collateralReserve,
      vaultType: currentVault.vaultType
    })
    instructionArray.push(depositIx)

    amountSynthetic = calculateAmountBorrow(
      assetPriceState[vaultSynthetic.toString()].val,
      currentVault.maxBorrow.scale,
      assetPriceState[vaultCollateral.toString()].val,
      currentVault.collateralAmount.scale,
      amountCollateral,
      Math.ceil(cRatio).toFixed(15)
    )
      .mul(new BN(10 ** currentVault.openFee.scale))
      .div(currentVault.openFee.val.add(new BN(10 ** currentVault.openFee.scale)))
    sumAmountSynthetic = sumAmountSynthetic.add(
      amountSynthetic
        .mul(currentVault.openFee.val.add(new BN(10 ** currentVault.openFee.scale)))
        .div(new BN(10 ** currentVault.openFee.scale))
    )
    const borrowedIx = yield* call([exchangeProgram, exchangeProgram.borrowVaultInstruction], {
      owner: wallet,
      to: toAddress,
      synthetic: vaultSynthetic,
      collateral: vaultCollateral,
      amount: amountSynthetic,
      collateralPriceFeed: currentVault.collateralPriceFeed,
      vaultType: currentVault.vaultType
    })
    instructionArray.push(borrowedIx)
    const swapIx = yield* call([exchangeProgram, exchangeProgram.swapInstruction], {
      amount: amountSynthetic,
      exchangeAccount: userExchangeAccount.address,
      owner: wallet,
      tokenIn: vaultSynthetic,
      tokenFor: vaultCollateral,
      userTokenAccountIn: toAddress,
      userTokenAccountFor: fromAddress
    })
    instructionArray.push(swapIx)

    amountCollateral = (yield* call(
      calculateAmountAfterSwap,
      assetPriceState[vaultSynthetic.toString()].val,
      assetPriceState[vaultCollateral.toString()].val,
      currentVault.maxBorrow.scale,
      currentVault.collateralAmount.scale,
      amountSynthetic,
      feeData.fee
    ))
      .mul(new BN(Number(0.995) * 10 ** collateralDecimal))
      .div(new BN(10 ** collateralDecimal))

    sumCollateralAmount = sumCollateralAmount.add(amountCollateral)

    symulatedSumCollateral = yield* call(
      calculateAmountAfterSwap,
      assetPriceState[vaultSynthetic.toString()].val,
      assetPriceState[vaultCollateral.toString()].val,
      currentVault.maxBorrow.scale,
      currentVault.collateralAmount.scale,
      calculateAmountBorrow(
        assetPriceState[vaultSynthetic.toString()].val,
        currentVault.maxBorrow.scale,
        assetPriceState[vaultCollateral.toString()].val,
        currentVault.collateralAmount.scale,
        amountCollateral,
        Math.ceil(cRatio).toFixed(15)
      )
        .mul(new BN(10 ** currentVault.openFee.scale))
        .div(currentVault.openFee.val.add(new BN(10 ** currentVault.openFee.scale))),
      feeData.fee
    )

    tmp = tmp + 1
  }

  instructionArray.push(
    yield* call([exchangeProgram, exchangeProgram.vaultDepositInstruction], {
      collateral: vaultCollateral,
      synthetic: vaultSynthetic,
      owner: wallet,
      amount: amountCollateral,
      userCollateralAccount: fromAddress,
      reserveAddress: currentVault.collateralReserve,
      vaultType: currentVault.vaultType
    })
  )
  amountSynthetic = calculateAmountBorrow(
    assetPriceState[vaultSynthetic.toString()].val,
    currentVault.maxBorrow.scale,
    assetPriceState[vaultCollateral.toString()].val,
    currentVault.collateralAmount.scale,
    amountToken
      .mul(new BN(Number(leverage) * 10 ** collateralDecimal))
      .div(new BN(10 ** collateralDecimal)),
    Math.ceil(+getCRatioFromLeverage(leverage)).toString()
  )
    .sub(sumAmountSynthetic)
    .mul(new BN(Number(0.995) * 10 ** currentVault.maxBorrow.scale))
    .div(new BN(10 ** currentVault.maxBorrow.scale))
    .mul(new BN(10 ** currentVault.openFee.scale))
    .div(currentVault.openFee.val.add(new BN(10 ** currentVault.openFee.scale)))

  const borrowedIx = yield* call([exchangeProgram, exchangeProgram.borrowVaultInstruction], {
    owner: wallet,
    to: toAddress,
    synthetic: vaultSynthetic,
    collateral: vaultCollateral,
    amount: amountSynthetic,
    collateralPriceFeed: currentVault.collateralPriceFeed,
    vaultType: currentVault.vaultType
  })
  instructionArray.push(borrowedIx)

  amountCollateral = (yield* call(
    calculateAmountAfterSwap,
    assetPriceState[vaultSynthetic.toString()].val,
    assetPriceState[vaultCollateral.toString()].val,
    currentVault.maxBorrow.scale,
    currentVault.collateralAmount.scale,
    amountSynthetic,
    feeData.fee
  ))
    .mul(new BN(Number(0.995) * 10 ** collateralDecimal))
    .div(new BN(10 ** collateralDecimal))
  const swapIx = yield* call([exchangeProgram, exchangeProgram.swapInstruction], {
    amount: amountSynthetic,
    exchangeAccount: userExchangeAccount.address,
    owner: wallet,
    tokenIn: vaultSynthetic,
    tokenFor: vaultCollateral,
    userTokenAccountIn: toAddress,
    userTokenAccountFor: fromAddress
  })
  instructionArray.push(swapIx)

  const depositIx = yield* call([exchangeProgram, exchangeProgram.vaultDepositInstruction], {
    collateral: vaultCollateral,
    synthetic: vaultSynthetic,
    owner: wallet,
    amount: amountCollateral,
    userCollateralAccount: fromAddress,
    reserveAddress: currentVault.collateralReserve,
    vaultType: currentVault.vaultType
  })
  instructionArray.push(depositIx)

  return instructionArray
}

export function* openLeveragePosition(
  currentlySelectedState: ILeverageSelected
): SagaGenerator<string[]> {
  const wallet = yield* call(getWallet)
  const exchangeProgram = yield* call(getExchangeProgram)
  const userExchangeAccount = yield* select(exchangeAccount)
  const tokensAccounts = yield* select(accounts)
  const vaultsPair = yield* select(vaults)
  const connection = yield* call(getConnection)
  const assetPriceState = yield* select(assetPrice)
  const feeData = yield* select(effectiveFeeData)
  const syntheticState = yield* select(synthetics)
  const userVaultState = yield* select(userVaults)
  const cRatio = Math.pow(
    Number(
      printBN(
        vaultsPair[currentlySelectedState.vaultAddress.toString()].collateralRatio.val,
        vaultsPair[currentlySelectedState.vaultAddress.toString()].collateralRatio.scale
      )
    ) / 100,
    -1
  )
  const { ix } = yield* call([exchangeProgram, exchangeProgram.createVaultEntryInstruction], {
    owner: wallet.publicKey,
    synthetic: currentlySelectedState.vaultSynthetic,
    collateral: currentlySelectedState.vaultCollateral,
    vaultType: vaultsPair[currentlySelectedState.vaultAddress.toString()].vaultType
  })
  const updatePricesIx = yield* call(
    [exchangeProgram, exchangeProgram.updateSelectedPricesInstruction],
    exchangeProgram.state.assetsList,
    [
      currentlySelectedState.vaultSynthetic,
      currentlySelectedState.vaultCollateral,
      currentlySelectedState.actualCollateral
    ]
  )
  let currentCollateralfromAddress = tokensAccounts[
    currentlySelectedState.actualCollateral.toString()
  ]
    ? tokensAccounts[currentlySelectedState.actualCollateral.toString()].address
    : null
  if (currentCollateralfromAddress === null) {
    currentCollateralfromAddress = yield* call(
      createAccount,
      currentlySelectedState.actualCollateral
    )
  }
  let fromAddress = tokensAccounts[currentlySelectedState.vaultCollateral.toString()]
    ? tokensAccounts[currentlySelectedState.vaultCollateral.toString()].address
    : null
  if (fromAddress === null) {
    fromAddress = yield* call(createAccount, currentlySelectedState.vaultCollateral)
  }
  let toAddress = tokensAccounts[currentlySelectedState.vaultSynthetic.toString()]
    ? tokensAccounts[currentlySelectedState.vaultSynthetic.toString()].address
    : null
  if (toAddress === null) {
    toAddress = yield* call(createAccount, currentlySelectedState.vaultSynthetic)
  }

  let amountCollateral: BN = currentlySelectedState.amountToken
  if (
    currentlySelectedState.actualCollateral.toString() !==
    currentlySelectedState.vaultCollateral.toString()
  ) {
    const collateralDecimal =
      vaultsPair[currentlySelectedState.vaultAddress.toString()].collateralAmount.scale

    amountCollateral = (yield* call(
      calculateAmountAfterSwap,
      assetPriceState[currentlySelectedState.actualCollateral.toString()].val,
      assetPriceState[currentlySelectedState.vaultCollateral.toString()].val,
      syntheticState[currentlySelectedState.actualCollateral.toString()].supply.scale,
      collateralDecimal,
      currentlySelectedState.amountToken,
      feeData.fee
    ))
      .mul(new BN(Number(0.995) * 10 ** collateralDecimal))
      .div(new BN(10 ** collateralDecimal))
  }
  const approveIx = Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    currentCollateralfromAddress,
    exchangeProgram.exchangeAuthority,
    wallet.publicKey,
    [],
    tou64(currentlySelectedState.amountToken)
  )
  const swapIx = yield* call([exchangeProgram, exchangeProgram.swapInstruction], {
    amount: currentlySelectedState.amountToken,
    exchangeAccount: userExchangeAccount.address,
    owner: wallet.publicKey,
    tokenIn: currentlySelectedState.actualCollateral,
    tokenFor: currentlySelectedState.vaultCollateral,
    userTokenAccountIn: currentCollateralfromAddress,
    userTokenAccountFor: fromAddress
  })
  const approveAllSwapIx = Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    toAddress,
    exchangeProgram.exchangeAuthority,
    wallet.publicKey,
    [],
    tou64(MAX_U64)
  )
  const approveAllDepositIx = Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    fromAddress,
    exchangeProgram.exchangeAuthority,
    wallet.publicKey,
    [],
    tou64(MAX_U64)
  )
  const instructionArray = yield* call(
    openLeverage,
    currentlySelectedState.vaultCollateral,
    currentlySelectedState.vaultSynthetic,
    wallet.publicKey,
    amountCollateral,
    vaultsPair[currentlySelectedState.vaultAddress.toString()],
    currentlySelectedState.leverage,
    fromAddress,
    toAddress,
    cRatio
  )

  const tx1 = new Transaction().add(updatePricesIx)
  if (!currentlySelectedState.vaultEntryExist) {
    tx1.add(ix)
  }
  const tx2 = new Transaction()
  if (
    currentlySelectedState.actualCollateral.toString() !==
    currentlySelectedState.vaultCollateral.toString()
  ) {
    tx2.add(approveIx).add(swapIx)
  }
  tx2.add(approveAllSwapIx).add(approveAllDepositIx)
  let txs: Transaction[] = []
  for (const tx of instructionArray) {
    tx2.add(tx)
  }
  txs = [tx1, tx2]

  const signTxs = yield* call(signAllTransaction, wallet, txs)
  const signature: string[] = []

  yield* call(sendAndConfirmRawTransaction, connection, signTxs[0].serialize(), {
    skipPreflight: true
  })
  yield* call(sleep, 1000)
  signature.push(
    yield* call([connection, connection.sendRawTransaction], signTxs[1].serialize(), {
      skipPreflight: true
    })
  )
  yield* call(sleep, 1500)
  if (typeof userVaultState[currentlySelectedState.vaultAddress.toString()] === 'undefined') {
    yield* put(
      actionsVault.setNewVaultEntryAddress({
        newVaultEntryAddress: currentlySelectedState.vaultAddress
      })
    )
  }
  return signature
}

export function* handleCloseLeverage(): Generator {
  const currentlySelectedState = yield* select(currentlySelected)
  try {
    const txids = yield* call(closeLeveragePosition, currentlySelectedState)
    for (const txid of txids) {
      yield put(
        snackbarsActions.add({
          message: 'Position has been closed.',
          variant: 'success',
          txid: txid,
          persist: false
        })
      )
    }
  } catch (error: any) {
    console.log(error.message.toString())
    yield put(
      snackbarsActions.add({
        message:
          error instanceof Error &&
          error.message ===
            'failed to send transaction: Transaction simulation failed: Insufficient funds for fee'
            ? 'Insufficient funds for fee'
            : 'Failed to close. Choose less percentage.',
        variant: 'error',
        persist: false
      })
    )
  }
}
export function* closeLeveragePosition(
  currentlySelectedState: ILeverageSelected
): SagaGenerator<string[]> {
  const wallet = yield* call(getWallet)
  const tokensAccounts = yield* select(accounts)
  const vaultsPair = yield* select(vaults)
  const connection = yield* call(getConnection)
  const userVaultsData = yield* select(userVaults)
  const exchangeProgram = yield* call(getExchangeProgram)
  const cRatio = Math.pow(
    Number(
      printBN(
        vaultsPair[currentlySelectedState.vaultAddress.toString()].collateralRatio.val,
        vaultsPair[currentlySelectedState.vaultAddress.toString()].collateralRatio.scale
      )
    ) / 100,
    -1
  )
  const fromAddress = tokensAccounts[currentlySelectedState.vaultCollateral.toString()].address
  const toAddress = tokensAccounts[currentlySelectedState.vaultSynthetic.toString()].address
  const instructionArray = yield* call(
    closeLeverage,
    currentlySelectedState.vaultCollateral,
    currentlySelectedState.vaultSynthetic,
    wallet.publicKey,
    currentlySelectedState.amountToken,
    vaultsPair[currentlySelectedState.vaultAddress.toString()],
    fromAddress,
    toAddress,
    cRatio,
    currentlySelectedState.leverage,
    userVaultsData[currentlySelectedState.vaultAddress.toString()]
  )
  const updatePricesIx = yield* call(
    [exchangeProgram, exchangeProgram.updateSelectedPricesInstruction],
    exchangeProgram.state.assetsList,
    [
      currentlySelectedState.vaultAddress,
      currentlySelectedState.vaultCollateral,
      currentlySelectedState.vaultSynthetic
    ]
  )
  const approveAllSwapIx = Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    fromAddress,
    exchangeProgram.exchangeAuthority,
    wallet.publicKey,
    [],
    tou64(MAX_U64)
  )
  const approveAllRepayIx = Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    toAddress,
    exchangeProgram.exchangeAuthority,
    wallet.publicKey,
    [],
    tou64(MAX_U64)
  )
  let txs: Transaction[] = []
  const tx1 = new Transaction().add(updatePricesIx).add(approveAllSwapIx).add(approveAllRepayIx)
  const tx2 = new Transaction()
  const tx3 = new Transaction()
  txs = [tx1]
  if (instructionArray.length <= 20) {
    for (const tx of instructionArray) {
      tx2.add(tx)
    }
    txs = [tx1, tx2]
  }
  if (instructionArray.length > 20) {
    for (const tx of instructionArray.slice(0, 20)) {
      tx2.add(tx)
    }
    txs = [tx1, tx2]
    for (const tx of instructionArray.slice(20, instructionArray.length)) {
      tx3.add(tx)
    }
    txs = [tx1, tx2, tx3]
  }
  const signTxs = yield* call(signAllTransaction, wallet, txs)
  const signature: string[] = []
  yield* call(sleep, 200)

  yield* call(sendAndConfirmRawTransaction, connection, signTxs[0].serialize())
  yield* call(sleep, 1000)
  if (instructionArray.length <= 20) {
    signature.push(
      yield* call([connection, connection.sendRawTransaction], signTxs[1].serialize(), {
        skipPreflight: false
      })
    )
  }
  if (instructionArray.length > 20) {
    signature.push(
      yield* call([connection, connection.sendRawTransaction], signTxs[1].serialize(), {
        skipPreflight: false
      })
    )
    yield* call(sleep, 1500)
    signature.push(
      yield* call([connection, connection.sendRawTransaction], signTxs[2].serialize(), {
        skipPreflight: false
      })
    )
  }

  return signature
}

export function* closeLeverage(
  vaultCollateral: PublicKey,
  vaultSynthetic: PublicKey,
  wallet: PublicKey,
  amountToken: BN,
  currentVault: Vault,
  fromAddress: PublicKey,
  toAddress: PublicKey,
  cRatio: number,
  leverage: number,
  userVault: VaultEntry
): SagaGenerator<Array<Transaction | TransactionInstruction>> {
  const exchangeProgram = yield* call(getExchangeProgram)
  const userExchangeAccount = yield* select(exchangeAccount)

  const feeData = yield* select(effectiveFeeData)
  const syntheticDecimal = currentVault.maxBorrow.scale
  let amountSynthetic: BN = new BN(0)
  let amountCollateral: BN = new BN(0)
  let sumSyntheticAmount: BN = new BN(0)
  let sumAmountCollateral: BN = new BN(0)
  let symulatedAmountSynthetic: BN = new BN(0)
  const instructionArray: Array<Transaction | TransactionInstruction> = []

  let tmp = 0
  const assetPriceState = yield* select(assetPrice)
  const availableWithdraw = calculateAvailableWithdraw(
    assetPriceState[vaultSynthetic.toString()].val,
    assetPriceState[vaultCollateral.toString()].val,
    syntheticDecimal,
    currentVault.collateralAmount.scale,
    cRatio.toFixed(12),
    userVault.collateralAmount.val,
    new BN(0),
    userVault.syntheticAmount.val
  )
    .mul(new BN(Number(0.9) * 10 ** currentVault.collateralAmount.scale))
    .div(new BN(10 ** currentVault.collateralAmount.scale))

  if (availableWithdraw.gt(new BN(0))) {
    const extraAmountSynthetic = (yield* call(
      calculateAmountAfterSwap,
      assetPriceState[vaultCollateral.toString()].val,
      assetPriceState[vaultSynthetic.toString()].val,
      currentVault.collateralAmount.scale,
      currentVault.maxBorrow.scale,
      availableWithdraw,
      feeData.fee
    ))
      .mul(new BN(Number(0.995) * 10 ** syntheticDecimal))
      .div(new BN(10 ** syntheticDecimal))
    const reducedAmountToken = amountToken
      .mul(new BN(Number(0.25) * 10 ** syntheticDecimal))
      .div(new BN(10 ** syntheticDecimal))

    if (extraAmountSynthetic.gte(reducedAmountToken)) {
      amountSynthetic = reducedAmountToken
      const amountColl = calculateAmountCollateral(
        assetPriceState[vaultSynthetic.toString()].val,
        currentVault.maxBorrow.scale,
        assetPriceState[vaultCollateral.toString()].val,
        currentVault.collateralAmount.scale,
        reducedAmountToken,
        cRatio.toFixed(15)
      )
      const withdrawIx = yield* call([exchangeProgram, exchangeProgram.withdrawVaultInstruction], {
        amount: amountColl,
        owner: wallet,
        synthetic: vaultSynthetic,
        collateral: vaultCollateral,
        userCollateralAccount: fromAddress,
        reserveAddress: currentVault.collateralReserve,
        collateralPriceFeed: currentVault.collateralPriceFeed,
        vaultType: currentVault.vaultType
      })
      instructionArray.push(withdrawIx)

      const swapIx = yield* call([exchangeProgram, exchangeProgram.swapInstruction], {
        amount: amountColl,
        exchangeAccount: userExchangeAccount.address,
        owner: wallet,
        tokenIn: vaultCollateral,
        tokenFor: vaultSynthetic,
        userTokenAccountIn: fromAddress,
        userTokenAccountFor: toAddress
      })
      instructionArray.push(swapIx)
    }
    if (extraAmountSynthetic.lt(reducedAmountToken)) {
      const withdrawIx = yield* call([exchangeProgram, exchangeProgram.withdrawVaultInstruction], {
        amount: availableWithdraw
          .mul(new BN(Number(0.99) * 10 ** currentVault.collateralAmount.scale))
          .div(new BN(10 ** currentVault.collateralAmount.scale)),
        owner: wallet,
        synthetic: vaultSynthetic,
        collateral: vaultCollateral,
        userCollateralAccount: fromAddress,
        reserveAddress: currentVault.collateralReserve,
        collateralPriceFeed: currentVault.collateralPriceFeed,
        vaultType: currentVault.vaultType
      })
      instructionArray.push(withdrawIx)

      const swapIx = yield* call([exchangeProgram, exchangeProgram.swapInstruction], {
        amount: availableWithdraw,
        exchangeAccount: userExchangeAccount.address,
        owner: wallet,
        tokenIn: vaultCollateral,
        tokenFor: vaultSynthetic,
        userTokenAccountIn: fromAddress,
        userTokenAccountFor: toAddress
      })
      instructionArray.push(swapIx)
      amountSynthetic = reducedAmountToken
    }
  }
  while (sumSyntheticAmount.add(symulatedAmountSynthetic).lt(amountToken) && tmp < 15) {
    sumSyntheticAmount = sumSyntheticAmount.add(amountSynthetic)
    const repayIx = yield* call([exchangeProgram, exchangeProgram.repayVaultInstruction], {
      collateral: vaultCollateral,
      synthetic: vaultSynthetic,
      amount: amountSynthetic,
      owner: wallet,
      userTokenAccountRepay: toAddress,
      vaultType: currentVault.vaultType
    })
    instructionArray.push(repayIx)

    amountCollateral = calculateAmountCollateral(
      assetPriceState[vaultSynthetic.toString()].val,
      currentVault.maxBorrow.scale,
      assetPriceState[vaultCollateral.toString()].val,
      currentVault.collateralAmount.scale,
      amountSynthetic,
      cRatio.toFixed(15)
    )
    sumAmountCollateral = sumAmountCollateral.add(amountCollateral)
    const withdrawIx = yield* call([exchangeProgram, exchangeProgram.withdrawVaultInstruction], {
      amount: amountCollateral,
      owner: wallet,
      synthetic: vaultSynthetic,
      collateral: vaultCollateral,
      userCollateralAccount: fromAddress,
      reserveAddress: currentVault.collateralReserve,
      collateralPriceFeed: currentVault.collateralPriceFeed,
      vaultType: currentVault.vaultType
    })
    instructionArray.push(withdrawIx)

    const swapIx = yield* call([exchangeProgram, exchangeProgram.swapInstruction], {
      amount: amountCollateral,
      exchangeAccount: userExchangeAccount.address,
      owner: wallet,
      tokenIn: vaultCollateral,
      tokenFor: vaultSynthetic,
      userTokenAccountIn: fromAddress,
      userTokenAccountFor: toAddress
    })
    instructionArray.push(swapIx)

    amountSynthetic = (yield* call(
      calculateAmountAfterSwap,
      assetPriceState[vaultCollateral.toString()].val,
      assetPriceState[vaultSynthetic.toString()].val,
      currentVault.collateralAmount.scale,
      currentVault.maxBorrow.scale,
      amountCollateral,
      feeData.fee
    ))
      .mul(new BN(Number(0.998) * 10 ** syntheticDecimal))
      .div(new BN(10 ** syntheticDecimal))
    symulatedAmountSynthetic = (yield* call(
      calculateAmountAfterSwap,
      assetPriceState[vaultCollateral.toString()].val,
      assetPriceState[vaultSynthetic.toString()].val,
      currentVault.collateralAmount.scale,
      currentVault.maxBorrow.scale,
      calculateAmountCollateral(
        assetPriceState[vaultSynthetic.toString()].val,
        currentVault.maxBorrow.scale,
        assetPriceState[vaultCollateral.toString()].val,
        currentVault.collateralAmount.scale,
        amountSynthetic,
        cRatio.toFixed(15)
      ),
      feeData.fee
    ))
      .mul(new BN(Number(0.99) * 10 ** syntheticDecimal))
      .div(new BN(10 ** syntheticDecimal))
    tmp = tmp + 1
  }
  amountCollateral = calculateAmountCollateral(
    assetPriceState[vaultSynthetic.toString()].val,
    currentVault.maxBorrow.scale,
    assetPriceState[vaultCollateral.toString()].val,
    currentVault.collateralAmount.scale,
    amountSynthetic,
    Number(getCRatioFromLeverage(leverage)).toFixed(10)
  ).sub(sumAmountCollateral)

  if (userVault.syntheticAmount.val.eq(amountToken)) {
    amountCollateral = MAX_U64
    amountSynthetic = MAX_U64
  }

  const repayIx = yield* call([exchangeProgram, exchangeProgram.repayVaultTransaction], {
    collateral: vaultCollateral,
    synthetic: vaultSynthetic,
    amount: amountSynthetic,
    owner: wallet,
    userTokenAccountRepay: toAddress,
    vaultType: currentVault.vaultType
  })
  instructionArray.push(repayIx)

  const withdrawIx = yield* call([exchangeProgram, exchangeProgram.withdrawVaultInstruction], {
    amount: amountCollateral,
    owner: wallet,
    synthetic: vaultSynthetic,
    collateral: vaultCollateral,
    userCollateralAccount: fromAddress,
    reserveAddress: currentVault.collateralReserve,
    collateralPriceFeed: currentVault.collateralPriceFeed,
    vaultType: currentVault.vaultType
  })
  instructionArray.push(withdrawIx)

  return instructionArray
}
export function* updateVaultsInfo(): Generator {
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
}

export function* actionOpenLeverage(): Generator {
  yield* takeEvery(actions.setOpenLeverage, handleOpenLeverage)
}
export function* actionCloseLeverage(): Generator {
  yield* takeEvery(actions.setCloseLeverage, handleCloseLeverage)
}
export function* updateVaultsData(): Generator {
  yield* takeEvery(actions.setCurrentPair, updateVaultsInfo)
}
export function* leverageSaga(): Generator {
  yield all([actionCloseLeverage, actionOpenLeverage, updateVaultsData].map(spawn))
}
