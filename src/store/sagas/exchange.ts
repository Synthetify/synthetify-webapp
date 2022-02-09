import { all, call, put, SagaGenerator, select, spawn, takeEvery, throttle } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions, ExchangeAccount, PayloadTypes, SwaplineSwapType } from '@reducers/exchange'
import { collaterals, exchangeAccount, swap, swaplineSwap, xUSDAddress } from '@selectors/exchange'
import { accounts, address, getAddressFromIndex, tokenAccount } from '@selectors/solanaWallet'
import testAdmin from '@consts/testAdmin'
import { DEFAULT_PUBLICKEY, DEFAULT_STAKING_DATA } from '@consts/static'
import {
  Account,
  Keypair,
  PublicKey,
  sendAndConfirmRawTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js'
import { pullAssetPrices } from './oracle'
import { createAccount, getToken, getWallet, signAndSend, sleep } from './wallet'
import { BN } from '@project-serum/anchor'
import {
  NATIVE_MINT,
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from '@solana/spl-token'
import { tou64 } from '@consts/utils'
import { getExchangeProgram } from '@web3/programs/exchange'
import { getConnection, updateSlot } from './connection'
import { PayloadAction } from '@reduxjs/toolkit'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { VaultSwap, actions as actionsVault } from '@reducers/vault'
import { actions as walletActions } from '@reducers/solanaWallet'
import { userVaults, vaults } from '@selectors/vault'
import { getTokenDetails } from './token'

export function* pullExchangeState(): Generator {
  const exchangeProgram = yield* call(getExchangeProgram)
  const state = yield* call([exchangeProgram, exchangeProgram.getState])
  yield* put(actions.setState(state))
  yield* call(pullAssetPrices)
  yield* call(updateSlot)
}

export function* setEmptyAccounts(collateralsAddresses: PublicKey[]): Generator {
  const tokensAccounts = yield* select(accounts)
  const acc: PublicKey[] = []
  for (const collateral of collateralsAddresses) {
    const collateralTokenProgram = yield* call(getToken, collateral)
    const accountAddress = tokensAccounts[collateral.toString()]
      ? tokensAccounts[collateral.toString()].address
      : null
    if (accountAddress == null) {
      acc.push(collateralTokenProgram.publicKey)
    }
  }
  if (acc.length !== 0) {
    yield* call(createMultipleAccounts, acc)
  }
}

export function* createMultipleAccounts(tokenAddress: PublicKey[]): SagaGenerator<PublicKey[]> {
  const wallet = yield* call(getWallet)
  const ixs: TransactionInstruction[] = []
  const associatedAccs: PublicKey[] = []

  for (const address of tokenAddress) {
    const associatedAccount = yield* call(
      Token.getAssociatedTokenAddress,
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      address,
      wallet.publicKey
    )
    associatedAccs.push(associatedAccount)
    const ix = Token.createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      address,
      associatedAccount,
      wallet.publicKey,
      wallet.publicKey
    )
    ixs.push(ix)
  }
  yield* call(
    signAndSend,
    wallet,
    ixs.reduce((tx, ix) => tx.add(ix), new Transaction())
  )
  for (const [index, address] of tokenAddress.entries()) {
    const token = yield* call(getTokenDetails, tokenAddress[index].toString())
    yield* put(
      walletActions.addTokenAccount({
        programId: address,
        balance: new BN(0),
        address: associatedAccs[index],
        decimals: token.decimals
      })
    )
    // Give time to subscribe to new token
    yield* call(sleep, 1000)
  }
  return associatedAccs
}

export function* getCollateralTokenAirdrop(
  collateralTokenAddress: PublicKey[],
  collateralsQuantities: number[]
): Generator {
  const wallet = yield* call(getWallet)
  const instructions: TransactionInstruction[] = []
  yield* call(setEmptyAccounts, collateralTokenAddress)
  const tokensAccounts = yield* select(accounts)
  for (const [index, collateral] of collateralTokenAddress.entries()) {
    instructions.push(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        collateral,
        tokensAccounts[collateral.toString()].address,
        testAdmin.publicKey,
        [],
        collateralsQuantities[index]
      )
    )
  }
  const tx = instructions.reduce((tx, ix) => tx.add(ix), new Transaction())
  const connection = yield* call(getConnection)
  const blockhash = yield* call([connection, connection.getRecentBlockhash])
  tx.feePayer = wallet.publicKey
  tx.recentBlockhash = blockhash.blockhash
  tx.sign(testAdmin)
  const signedTx = yield* call([wallet, wallet.signTransaction], tx)
  yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
    skipPreflight: true
  })

  console.log('Token Airdroped')
}
export function* depositCollateral(
  amount: BN,
  collateralTokenAddress: PublicKey
): SagaGenerator<string> {
  const allCollaterals = yield* select(collaterals)
  if (allCollaterals[collateralTokenAddress.toString()].symbol === 'WSOL') {
    return yield* call(depositCollateralWSOL, amount)
  }

  const tokensAccounts = yield* select(accounts)
  const userCollateralTokenAccount = tokensAccounts[collateralTokenAddress.toString()]
  const userExchangeAccount = yield* select(exchangeAccount)
  const wallet = yield* call(getWallet)
  const exchangeProgram = yield* call(getExchangeProgram)
  if (userExchangeAccount.address.equals(DEFAULT_PUBLICKEY)) {
    const { account, ix } = yield* call(
      [exchangeProgram, exchangeProgram.createExchangeAccountInstruction],
      new PublicKey(wallet.publicKey.toBuffer())
    )
    const depositIx = yield* call([exchangeProgram, exchangeProgram.depositInstruction], {
      amount,
      exchangeAccount: account,
      userCollateralAccount: userCollateralTokenAccount.address,
      owner: wallet.publicKey,
      reserveAddress: allCollaterals[collateralTokenAddress.toString()].reserveAddress
    })
    const approveIx = Token.createApproveInstruction(
      TOKEN_PROGRAM_ID,
      userCollateralTokenAccount.address,
      exchangeProgram.exchangeAuthority,
      wallet.publicKey,
      [],
      tou64(amount)
    )
    const tx = new Transaction().add(ix).add(approveIx).add(depositIx)
    const connection = yield* call(getConnection)
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.feePayer = wallet.publicKey
    tx.recentBlockhash = blockhash.blockhash
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    yield* put(
      actions.setExchangeAccount({
        address: account,
        collaterals: [],
        debtShares: new BN(0),
        userStaking: DEFAULT_STAKING_DATA
      })
    )
    const signature = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize())
    yield* call(sleep, 1500) // Give time to subscribe to account
    return signature
  } else {
    const depositIx = yield* call([exchangeProgram, exchangeProgram.depositInstruction], {
      amount,
      exchangeAccount: userExchangeAccount.address,
      userCollateralAccount: userCollateralTokenAccount.address,
      owner: wallet.publicKey,
      reserveAddress: allCollaterals[collateralTokenAddress.toString()].reserveAddress
    })
    const approveIx = Token.createApproveInstruction(
      TOKEN_PROGRAM_ID,
      userCollateralTokenAccount.address,
      exchangeProgram.exchangeAuthority,
      wallet.publicKey,
      [],
      tou64(amount)
    )
    const tx = new Transaction().add(approveIx).add(depositIx)
    const connection = yield* call(getConnection)
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.feePayer = wallet.publicKey
    tx.recentBlockhash = blockhash.blockhash
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)
    const signature = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize())
    return signature
  }
}
export function* depositCollateralWSOL(amount: BN): SagaGenerator<string> {
  const account = yield* select(exchangeAccount)
  let userExchangeAccount: ExchangeAccount = Object.create(account)
  const wallet = yield* call(getWallet)
  const exchangeProgram = yield* call(getExchangeProgram)
  const allCollaterals = yield* select(collaterals)
  const connection = yield* call(getConnection)

  const wrappedSolAccount = Keypair.generate()
  let createExchangeAccountIx: TransactionInstruction | null = null
  if (userExchangeAccount.address.equals(DEFAULT_PUBLICKEY)) {
    const { account, ix } = yield* call(
      [exchangeProgram, exchangeProgram.createExchangeAccountInstruction],
      new PublicKey(wallet.publicKey.toBuffer())
    )
    createExchangeAccountIx = ix
    userExchangeAccount = { ...userExchangeAccount, address: account }
  }
  const createIx = SystemProgram.createAccount({
    fromPubkey: wallet.publicKey,
    newAccountPubkey: wrappedSolAccount.publicKey,
    lamports: yield* call(Token.getMinBalanceRentForExemptAccount, connection),
    space: 165,
    programId: TOKEN_PROGRAM_ID
  })
  const transferIx = SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: wrappedSolAccount.publicKey,
    lamports: amount.toNumber()
  })
  const initIx = Token.createInitAccountInstruction(
    TOKEN_PROGRAM_ID,
    NATIVE_MINT,
    wrappedSolAccount.publicKey,
    wallet.publicKey
  )
  const depositIx = yield* call([exchangeProgram, exchangeProgram.depositInstruction], {
    amount,
    exchangeAccount: userExchangeAccount.address,
    userCollateralAccount: wrappedSolAccount.publicKey,
    owner: wallet.publicKey,
    reserveAddress: allCollaterals[NATIVE_MINT.toString()].reserveAddress
  })
  const approveIx = Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    wrappedSolAccount.publicKey,
    exchangeProgram.exchangeAuthority,
    wallet.publicKey,
    [],
    tou64(amount)
  )
  const unwrapIx = Token.createCloseAccountInstruction(
    TOKEN_PROGRAM_ID,
    wrappedSolAccount.publicKey,
    wallet.publicKey,
    wallet.publicKey,
    []
  )
  let tx: Transaction
  if (createExchangeAccountIx) {
    tx = new Transaction()
      .add(createExchangeAccountIx)
      .add(createIx)
      .add(transferIx)
      .add(initIx)
      .add(approveIx)
      .add(depositIx)
      .add(unwrapIx)
    yield* put(
      actions.setExchangeAccount({
        address: userExchangeAccount.address,
        collaterals: [],
        debtShares: new BN(0),
        userStaking: DEFAULT_STAKING_DATA
      })
    )
  } else {
    tx = new Transaction()
      .add(createIx)
      .add(transferIx)
      .add(initIx)
      .add(approveIx)
      .add(depositIx)
      .add(unwrapIx)
  }

  const blockhash = yield* call([connection, connection.getRecentBlockhash])
  tx.feePayer = wallet.publicKey
  tx.recentBlockhash = blockhash.blockhash
  const signedTx = yield* call([wallet, wallet.signTransaction], tx)

  signedTx.partialSign(wrappedSolAccount)
  const signature = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize())
  return signature
}

export function* mintUsd(amount: BN): SagaGenerator<string> {
  const usdTokenAddress = yield* select(xUSDAddress)
  const tokensAccounts = yield* select(accounts)
  const exchangeProgram = yield* call(getExchangeProgram)
  const wallet = yield* call(getWallet)
  const userExchangeAccount = yield* select(exchangeAccount)
  let accountAddress = tokensAccounts[usdTokenAddress.toString()]
    ? tokensAccounts[usdTokenAddress.toString()].address
    : null
  if (accountAddress == null) {
    accountAddress = yield* call(createAccount, usdTokenAddress)
  }
  const signature = yield* call([exchangeProgram, exchangeProgram.mint], {
    amount,
    exchangeAccount: userExchangeAccount.address,
    owner: wallet.publicKey,
    to: accountAddress
  })
  console.log(signature)
  return signature
}
export function* withdrawCollateral(
  amount: BN,
  collateralTokenAddress: PublicKey
): SagaGenerator<string> {
  const allCollaterals = yield* select(collaterals)
  if (allCollaterals[collateralTokenAddress.toString()].symbol === 'WSOL') {
    return yield* call(withdrawCollateralWSOL, amount)
  }

  const collateralAccountAddress = yield* select(tokenAccount(collateralTokenAddress))

  const exchangeProgram = yield* call(getExchangeProgram)
  const userExchangeAccount = yield* select(exchangeAccount)
  const wallet = yield* call(getWallet)
  let accountAddress: PublicKey

  if (!collateralAccountAddress) {
    accountAddress = yield* call(
      createAccount,
      allCollaterals[collateralTokenAddress.toString()].collateralAddress
    )
  } else {
    accountAddress = collateralAccountAddress.address
  }

  const signature = yield* call([exchangeProgram, exchangeProgram.withdraw], {
    amount,
    exchangeAccount: userExchangeAccount.address,
    owner: wallet.publicKey,
    userCollateralAccount: accountAddress,
    reserveAccount: allCollaterals[collateralTokenAddress.toString()].reserveAddress
  })
  return signature
}
export function* withdrawCollateralWSOL(amount: BN): SagaGenerator<string> {
  const exchangeProgram = yield* call(getExchangeProgram)
  const userExchangeAccount = yield* select(exchangeAccount)
  const wallet = yield* call(getWallet)

  const allCollaterals = yield* select(collaterals)
  const wrappedSolAccount = Keypair.generate()
  const connection = yield* call(getConnection)

  const createIx = SystemProgram.createAccount({
    fromPubkey: wallet.publicKey,
    newAccountPubkey: wrappedSolAccount.publicKey,
    lamports: yield* call(Token.getMinBalanceRentForExemptAccount, connection),
    space: 165,
    programId: TOKEN_PROGRAM_ID
  })

  const initIx = Token.createInitAccountInstruction(
    TOKEN_PROGRAM_ID,
    NATIVE_MINT,
    wrappedSolAccount.publicKey,
    wallet.publicKey
  )
  const updatePricesIx = yield* call(
    [exchangeProgram, exchangeProgram.updatePricesInstruction],
    exchangeProgram.state.assetsList
  )
  const withdrawIx = yield* call([exchangeProgram, exchangeProgram.withdrawInstruction], {
    amount,
    exchangeAccount: userExchangeAccount.address,
    owner: wallet.publicKey,
    userCollateralAccount: wrappedSolAccount.publicKey,
    reserveAccount: allCollaterals[NATIVE_MINT.toString()].reserveAddress
  })
  const unwrapIx = Token.createCloseAccountInstruction(
    TOKEN_PROGRAM_ID,
    wrappedSolAccount.publicKey,
    wallet.publicKey,
    wallet.publicKey,
    []
  )
  const tx = new Transaction()
    .add(createIx)
    .add(initIx)
    .add(updatePricesIx)
    .add(withdrawIx)
    .add(unwrapIx)
  const blockhash = yield* call([connection, connection.getRecentBlockhash])
  tx.feePayer = wallet.publicKey
  tx.recentBlockhash = blockhash.blockhash
  const signedTx = yield* call([wallet, wallet.signTransaction], tx)

  signedTx.partialSign(wrappedSolAccount)
  const signature = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize())
  return signature
}
export function* burnToken(amount: BN, tokenAddress: PublicKey): SagaGenerator<string> {
  const userTokenAccount = yield* select(tokenAccount(tokenAddress))
  if (!userTokenAccount) {
    return ''
  }
  const wallet = yield* call(getWallet)

  const exchangeProgram = yield* call(getExchangeProgram)
  const userExchangeAccount = yield* select(exchangeAccount)

  const signature = yield* call([exchangeProgram, exchangeProgram.burn], {
    amount,
    exchangeAccount: userExchangeAccount.address,
    owner: wallet.publicKey,
    userTokenAccountBurn: userTokenAccount.address
  })
  return signature
}

export function* claimRewards(): SagaGenerator<string> {
  const exchangeProgram = yield* call(getExchangeProgram)
  const userExchangeAccount = yield* select(exchangeAccount)

  return yield* call([exchangeProgram, exchangeProgram.claimRewards], userExchangeAccount.address)
}

export function* withdrawRewards(): SagaGenerator<string> {
  const exchangeProgram = yield* call(getExchangeProgram)
  const allCollaterals = yield* select(collaterals)

  const userTokenAccount = yield* select(
    tokenAccount(Object.values(allCollaterals)[0].collateralAddress)
  )
  let snyAddress
  if (!userTokenAccount) {
    snyAddress = yield* call(createAccount, Object.values(allCollaterals)[0].collateralAddress)
  } else {
    snyAddress = userTokenAccount.address
  }
  const wallet = yield* call(getWallet)
  const userExchangeAccount = yield* select(exchangeAccount)

  return yield* call([exchangeProgram, exchangeProgram.withdrawRewards], {
    exchangeAccount: userExchangeAccount.address,
    owner: wallet.publicKey,
    userTokenAccount: snyAddress
  })
}

export function* handleSwap(): Generator {
  const swapData = yield* select(swap)

  try {
    const wallet = yield* call(getWallet)

    const tokensAccounts = yield* select(accounts)
    const exchangeProgram = yield* call(getExchangeProgram)
    const userExchangeAccount = yield* select(exchangeAccount)

    let fromAddress = tokensAccounts[swapData.fromToken.toString()]
      ? tokensAccounts[swapData.fromToken.toString()].address
      : null
    if (fromAddress == null) {
      fromAddress = yield* call(createAccount, swapData.fromToken)
    }
    let toAddress = tokensAccounts[swapData.toToken.toString()]
      ? tokensAccounts[swapData.toToken.toString()].address
      : null
    if (toAddress == null) {
      toAddress = yield* call(createAccount, swapData.toToken)
    }
    const txid = yield* call([exchangeProgram, exchangeProgram.swap], {
      amount: swapData.amount,
      exchangeAccount: userExchangeAccount.address,
      owner: wallet.publicKey,
      tokenIn: swapData.fromToken,
      tokenFor: swapData.toToken,
      userTokenAccountIn: fromAddress,
      userTokenAccountFor: toAddress
    })
    yield* put(actions.swapDone({ txid: txid[1] }))

    yield put(
      snackbarsActions.add({
        message: 'Tokens swapped successfully.',
        variant: 'success',
        txid,
        persist: false
      })
    )
  } catch (error) {
    yield* put(actions.swapDone({ txid: '12' }))
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleSwaplineWSOLSwap(
  amount: BN,
  signer: PublicKey,
  userSyntheticAccount: PublicKey,
  synthetic: PublicKey,
  collateral: PublicKey,
  type: SwaplineSwapType
): Generator {
  const exchangeProgram = yield* call(getExchangeProgram)
  const wallet = yield* call(getWallet)

  const wrappedSolAccount = Keypair.generate()
  const connection = yield* call(getConnection)

  const createIx = SystemProgram.createAccount({
    fromPubkey: wallet.publicKey,
    newAccountPubkey: wrappedSolAccount.publicKey,
    lamports: yield* call(Token.getMinBalanceRentForExemptAccount, connection),
    space: 165,
    programId: TOKEN_PROGRAM_ID
  })
  const transferIx = SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: wrappedSolAccount.publicKey,
    lamports: amount.toNumber()
  })
  const initIx = Token.createInitAccountInstruction(
    TOKEN_PROGRAM_ID,
    NATIVE_MINT,
    wrappedSolAccount.publicKey,
    wallet.publicKey
  )
  const swaplineIx = yield* call([exchangeProgram, exchangeProgram[type]], {
    amount,
    signer,
    userSyntheticAccount,
    userCollateralAccount: wrappedSolAccount.publicKey,
    synthetic,
    collateral
  })
  const approveIx = Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    type === 'nativeToSynthetic' ? wrappedSolAccount.publicKey : userSyntheticAccount,
    exchangeProgram.exchangeAuthority,
    wallet.publicKey,
    [],
    tou64(amount)
  )
  const unwrapIx = Token.createCloseAccountInstruction(
    TOKEN_PROGRAM_ID,
    wrappedSolAccount.publicKey,
    wallet.publicKey,
    wallet.publicKey,
    []
  )
  /* eslint-disable @typescript-eslint/indent */
  const tx =
    type === 'nativeToSynthetic'
      ? new Transaction()
          .add(createIx)
          .add(transferIx)
          .add(initIx)
          .add(approveIx)
          .add(swaplineIx)
          .add(unwrapIx)
      : new Transaction().add(createIx).add(initIx).add(approveIx).add(swaplineIx).add(unwrapIx)

  const blockhash = yield* call([connection, connection.getRecentBlockhash])
  tx.feePayer = wallet.publicKey
  tx.recentBlockhash = blockhash.blockhash
  const signedTx = yield* call([wallet, wallet.signTransaction], tx)

  signedTx.partialSign(wrappedSolAccount)
  const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize())

  yield* put(actions.swaplineSwapDone({ txid }))
  yield put(
    snackbarsActions.add({
      message: 'Successfully swaped token.',
      variant: 'success',
      persist: false
    })
  )
}

export function* handleSwaplineSwap(): Generator {
  const swapData = yield* select(swaplineSwap)

  try {
    const walletAddress = yield* select(address)
    const tokensAccounts = yield* select(accounts)
    const allCollaterals = yield* select(collaterals)

    let userSyntheticAccount = tokensAccounts[swapData.synthetic.toString()]
      ? tokensAccounts[swapData.synthetic.toString()].address
      : null
    if (userSyntheticAccount === null) {
      userSyntheticAccount = yield* call(createAccount, swapData.synthetic)
    }

    let userCollateralAccount
    if (allCollaterals[swapData.collateral.toString()].symbol === 'WSOL') {
      return yield* call(
        handleSwaplineWSOLSwap,
        swapData.amount,
        walletAddress,
        userSyntheticAccount,
        swapData.synthetic,
        swapData.collateral,
        swapData.swapType
      )
    } else if (tokensAccounts[swapData.collateral.toString()]) {
      userCollateralAccount = tokensAccounts[swapData.collateral.toString()].address
    } else {
      userCollateralAccount = yield* call(createAccount, swapData.collateral)
    }
    const exchangeProgram = yield* call(getExchangeProgram)
    const swaplineIx = yield* call([exchangeProgram, exchangeProgram[swapData.swapType]], {
      amount: swapData.amount,
      signer: walletAddress,
      userSyntheticAccount,
      userCollateralAccount,
      synthetic: swapData.synthetic,
      collateral: swapData.collateral
    })
    const wallet = yield* call(getWallet)
    const approveIx = Token.createApproveInstruction(
      TOKEN_PROGRAM_ID,
      swapData.swapType === 'nativeToSynthetic' ? userCollateralAccount : userSyntheticAccount,
      exchangeProgram.exchangeAuthority,
      wallet.publicKey,
      [],
      tou64(swapData.amount)
    )
    const tx = new Transaction().add(approveIx).add(swaplineIx)
    const txid = yield* call(signAndSend, wallet, tx)
    yield* put(actions.swaplineSwapDone({ txid }))

    yield put(
      snackbarsActions.add({
        message: 'Successfully swaped token.',
        variant: 'success',
        persist: false
      })
    )
  } catch (error) {
    yield* put(actions.swaplineSwapDone({ txid: undefined }))
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleAddCollateralVault(vaultSwapData: VaultSwap): SagaGenerator<string> {
  const wallet = yield* call(getWallet)
  const exchangeProgram = yield* call(getExchangeProgram)
  const tokensAccounts = yield* select(accounts)
  const userCollateralTokenAccount = tokensAccounts[vaultSwapData.collateral.toString()]
  const vaultsPair = yield* select(vaults)
  const connection = yield* call(getConnection)
  const token = new Token(
    connection,
    tokensAccounts[vaultSwapData.collateral.toString()].address,
    TOKEN_PROGRAM_ID,
    new Account()
  )
  const userVaultState = yield* select(userVaults)
  const { ix } = yield* call([exchangeProgram, exchangeProgram.createVaultEntryInstruction], {
    owner: wallet.publicKey,
    synthetic: vaultSwapData.synthetic,
    collateral: vaultSwapData.collateral,
    vaultType: vaultsPair[vaultSwapData.vaultAddress.toString()].vaultType
  })
  const depositIx = yield* call([exchangeProgram, exchangeProgram.vaultDepositTransaction], {
    collateral: vaultSwapData.collateral,
    synthetic: vaultSwapData.synthetic,
    owner: wallet.publicKey,
    amount: vaultSwapData.collateralAmount,
    userCollateralAccount: userCollateralTokenAccount.address,
    reserveAddress: vaultsPair[vaultSwapData.vaultAddress.toString()].collateralReserve,
    collateralToken: token,
    vaultType: vaultsPair[vaultSwapData.vaultAddress.toString()].vaultType
  })
  let tx

  if (!vaultSwapData.vaultEntryExist) {
    tx = new Transaction().add(ix).add(depositIx)
  } else {
    tx = new Transaction().add(depositIx)
  }

  const signature = yield* call(signAndSend, wallet, tx)
  yield* call(sleep, 1500)
  if (typeof userVaultState[vaultSwapData.vaultAddress.toString()] === 'undefined') {
    yield* put(
      actionsVault.setNewVaultEntryAddress({
        newVaultEntryAddress: vaultSwapData.vaultAddress
      })
    )
  }

  return signature
}
export function* handleBorrowedVault(vaultSwapData: VaultSwap): SagaGenerator<string> {
  const wallet = yield* call(getWallet)
  const exchangeProgram = yield* call(getExchangeProgram)
  const tokensAccounts = yield* select(accounts)
  const userCollateralTokenAccount = tokensAccounts[vaultSwapData.collateral.toString()]
  const vaultsPair = yield* select(vaults)
  const connection = yield* call(getConnection)
  const token = new Token(
    connection,
    tokensAccounts[vaultSwapData.collateral.toString()].address,
    TOKEN_PROGRAM_ID,
    new Account()
  )
  const userVaultState = yield* select(userVaults)
  let userSyntheticTokenAccount = tokensAccounts[vaultSwapData.synthetic.toString()]
    ? tokensAccounts[vaultSwapData.synthetic.toString()].address
    : null

  if (userSyntheticTokenAccount == null) {
    userSyntheticTokenAccount = yield* call(createAccount, vaultSwapData.synthetic)
  }
  const { ix } = yield* call([exchangeProgram, exchangeProgram.createVaultEntryInstruction], {
    owner: wallet.publicKey,
    synthetic: vaultSwapData.synthetic,
    collateral: vaultSwapData.collateral,
    vaultType: vaultsPair[vaultSwapData.vaultAddress.toString()].vaultType
  })
  const depositIx = yield* call([exchangeProgram, exchangeProgram.vaultDepositTransaction], {
    collateral: vaultSwapData.collateral,
    synthetic: vaultSwapData.synthetic,
    owner: wallet.publicKey,
    amount: vaultSwapData.collateralAmount,
    userCollateralAccount: userCollateralTokenAccount.address,
    reserveAddress: vaultsPair[vaultSwapData.vaultAddress.toString()].collateralReserve,
    collateralToken: token,
    vaultType: vaultsPair[vaultSwapData.vaultAddress.toString()].vaultType
  })

  const borrowedIx = yield* call([exchangeProgram, exchangeProgram.borrowVaultTransaction], {
    owner: wallet.publicKey,
    to: userSyntheticTokenAccount,
    synthetic: vaultSwapData.synthetic,
    collateral: vaultSwapData.collateral,
    amount: vaultSwapData.syntheticAmount,
    collateralPriceFeed: vaultsPair[vaultSwapData.vaultAddress.toString()].collateralPriceFeed,
    vaultType: vaultsPair[vaultSwapData.vaultAddress.toString()].vaultType
  })
  let tx

  if (vaultSwapData.collateralAmount.gt(new BN(0))) {
    if (!vaultSwapData.vaultEntryExist) {
      tx = new Transaction().add(ix).add(depositIx).add(borrowedIx)
    } else {
      tx = new Transaction().add(depositIx).add(borrowedIx)
    }
  } else {
    tx = new Transaction().add(borrowedIx)
  }

  const signature = yield* call(signAndSend, wallet, tx)
  yield* call(sleep, 1500)
  if (typeof userVaultState[vaultSwapData.vaultAddress.toString()] === 'undefined') {
    yield* put(
      actionsVault.setNewVaultEntryAddress({
        newVaultEntryAddress: vaultSwapData.vaultAddress
      })
    )
  }
  return signature
}

export function* handleWithdrawCollateralVault(vaultSwapData: VaultSwap): SagaGenerator<string> {
  const wallet = yield* call(getWallet)
  const exchangeProgram = yield* call(getExchangeProgram)
  const tokensAccounts = yield* select(accounts)
  const userCollateralTokenAccount = tokensAccounts[vaultSwapData.collateral.toString()]
  const vaultsPair = yield* select(vaults)

  const withdrawIx = yield* call([exchangeProgram, exchangeProgram.withdrawVaultTransaction], {
    amount: vaultSwapData.collateralAmount,
    owner: wallet.publicKey,
    synthetic: vaultSwapData.synthetic,
    collateral: vaultSwapData.collateral,
    userCollateralAccount: userCollateralTokenAccount.address,
    reserveAddress: vaultsPair[vaultSwapData.vaultAddress.toString()].collateralReserve,
    collateralPriceFeed: vaultsPair[vaultSwapData.vaultAddress.toString()].collateralPriceFeed,
    vaultType: vaultsPair[vaultSwapData.vaultAddress.toString()].vaultType
  })

  const tx = new Transaction().add(withdrawIx)
  const signature = yield* call(signAndSend, wallet, tx)
  return signature
}

export function* handleRepaySyntheticVault(vaultSwapData: VaultSwap): SagaGenerator<string> {
  const wallet = yield* call(getWallet)
  const exchangeProgram = yield* call(getExchangeProgram)
  const tokensAccounts = yield* select(accounts)
  const userCollateralTokenAccount = tokensAccounts[vaultSwapData.collateral.toString()]
  const vaultsPair = yield* select(vaults)

  const repayIx = yield* call([exchangeProgram, exchangeProgram.repayVaultTransaction], {
    collateral: vaultSwapData.collateral,
    synthetic: vaultSwapData.synthetic,
    amount: vaultSwapData.syntheticAmount,
    owner: wallet.publicKey,
    userTokenAccountRepay: tokensAccounts[vaultSwapData.synthetic.toString()].address,
    vaultType: vaultsPair[vaultSwapData.vaultAddress.toString()].vaultType
  })

  const withdrawIx = yield* call([exchangeProgram, exchangeProgram.withdrawVaultTransaction], {
    amount: vaultSwapData.collateralAmount,
    owner: wallet.publicKey,
    synthetic: vaultSwapData.synthetic,
    collateral: vaultSwapData.collateral,
    userCollateralAccount: userCollateralTokenAccount.address,
    reserveAddress: vaultsPair[vaultSwapData.vaultAddress.toString()].collateralReserve,
    collateralPriceFeed: vaultsPair[vaultSwapData.vaultAddress.toString()].collateralPriceFeed,
    vaultType: vaultsPair[vaultSwapData.vaultAddress.toString()].vaultType
  })
  let tx

  if (vaultSwapData.collateralAmount.gt(new BN(0))) {
    tx = new Transaction().add(repayIx).add(withdrawIx)
  } else {
    tx = new Transaction().add(repayIx)
  }
  const signature = yield* call(signAndSend, wallet, tx)
  return signature
}

export function* swapHandler(): Generator {
  yield* takeEvery(actions.swap, handleSwap)
}
export function* swaplineSwapHandler(): Generator {
  yield* takeEvery(actions.swaplineSwap, handleSwaplineSwap)
}
const pendingUpdates: { [x: string]: Decimal } = {}
const pendingUpdatesVaults: { [x: string]: Decimal } = {}

export function* batchAssetsPrices(
  action: PayloadAction<PayloadTypes['setAssetPrice']>
): Generator {
  pendingUpdates[action.payload.tokenIndex.toString()] = action.payload.price
  const state = yield* select(getAddressFromIndex(action.payload.tokenIndex))
  state.forEach(element => {
    if (element !== '') {
      pendingUpdatesVaults[element] = action.payload.price
    }
  })
}
export function* handleAssetPrice(): Generator {
  yield* put(actions.batchSetAssetPrice(pendingUpdates))
  yield* put(actionsVault.batchSetAssetPrice(pendingUpdatesVaults))
}

export function* assetPriceHandler(): Generator {
  yield* throttle(3000, actions.setAssetPrice, handleAssetPrice)
}
export function* assetPriceBatcher(): Generator {
  yield* takeEvery(actions.setAssetPrice, batchAssetsPrices)
}
export function* exchangeSaga(): Generator {
  yield all([swapHandler, swaplineSwapHandler, assetPriceHandler, assetPriceBatcher].map(spawn))
}
