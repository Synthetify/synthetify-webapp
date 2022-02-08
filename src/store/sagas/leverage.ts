import { actions } from '@reducers/leverage'
import { synthetics, getLeverageVaultPairs } from '@selectors/exchange'
import { accounts } from '@selectors/solanaWallet'
import { getExchangeProgram } from '@web3/programs/exchange'
import { BN } from '@project-serum/anchor'
import { spawn, all, select, put, call, takeEvery } from 'typed-redux-saga'
import { assetPrice } from '@selectors/vault'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { getWallet } from './wallet'
import { currentlySelected } from '@selectors/leverage'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { openLeveragePosition } from './exchange'
export function* initLeveragePairs(): Generator {
  const syntheticTokens = yield* select(synthetics)
  const tokensAccounts = yield* select(accounts)
  const assetPrices = yield* select(assetPrice)
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
      console.log(
        'collateral price: ',
        assetPrices[vault.collateral.toString()],
        'synthetic price',
        assetPrices[vault.synthetic.toString()]
      )
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
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
  const currentlySelectedState = yield* select(currentlySelected)
  try {
    const txid = yield* call(openLeveragePosition, currentlySelectedState)
    yield* put(
      actions.actionDone({
        txid: txid
      })
    )
    yield put(
      snackbarsActions.add({
        message: 'Synthetic leverage successfully.',
        variant: 'success',
        txid: txid,
        persist: false
      })
    )
  } catch (error) {
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

export function* actionOpenLeverage(): Generator {
  yield* takeEvery(actions.setOpenLeverage, handleOpenLeverage)
}

export function* leverageSaga(): Generator {
  yield all([actionOpenLeverage].map(spawn))
}
