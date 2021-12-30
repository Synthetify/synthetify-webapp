import { call, put, takeEvery, spawn, all, select, throttle, SagaGenerator } from 'typed-redux-saga'
import { getWallet } from './wallet'
import { getExchangeProgram } from '@web3/programs/exchange'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { actions, PayloadTypes } from '@reducers/vault'
import {
  handleAddCollateralVault,
  handleBorrowedVault,
  handleRepaySyntheticVault,
  handleWithdrawCollateralVault
} from './exchange'
import { userVaults, vaults, vaultSwap } from '@selectors/vault'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { printBN, stringToMinDecimalBN } from '@consts/utils'
import BN from 'bn.js'
import { PayloadAction } from '@reduxjs/toolkit'
import { Decimal, VaultEntry } from '@synthetify/sdk/lib/exchange'
import { VAULTS_MAP } from '@synthetify/sdk/lib/utils'
import { networkTypetoProgramNetwork } from '@web3/connection'
import { network } from '@selectors/solanaConnection'
import { address } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
function* checkVaultEntry(): Generator {
  const wallet = yield* call(getWallet)
  const exchangeProgram = yield* call(getExchangeProgram)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    yield* call(
      [exchangeProgram, exchangeProgram.getVaultEntryForOwner],
      vaultSwapData.synthetic,
      vaultSwapData.collateral,
      wallet.publicKey
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
    const vaultSwapData = yield* select(vaultSwap)
    const address = yield* call(
      [exchangeProgram, exchangeProgram.getVaultAddress],
      vaultSwapData.synthetic,
      vaultSwapData.collateral
    )
    yield* put(actions.setVaultAddress({ vaultAddress: address.vaultAddress }))
  } catch (error) {
    yield* put(actions.setVaultAddress({ vaultAddress: DEFAULT_PUBLICKEY }))
  }
}
export function* handleAddCollateral(): Generator {
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    const txid = yield* call(handleAddCollateralVault, vaultSwapData)
    yield* put(
      actions.actionDone({
        txid: txid
      })
    )
    yield put(
      snackbarsActions.add({
        message: 'Collateral deposited successfully.',
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

export function* handleBorrow(): Generator {
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    const txid = yield* call(handleBorrowedVault, vaultSwapData)
    yield* put(
      actions.actionDone({
        txid: txid
      })
    )
    yield put(
      snackbarsActions.add({
        message: 'Synthetic borrowed successfully.',
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

export function* handleWithdraw(): Generator {
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    const txid = yield* call(handleWithdrawCollateralVault, vaultSwapData)
    yield* put(
      actions.actionDone({
        txid: txid
      })
    )
    yield put(
      snackbarsActions.add({
        message: 'Collateral withdrawn successfully.',
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

export function* handleRepay(): Generator {
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    const txid = yield* call(handleRepaySyntheticVault, vaultSwapData)
    yield* put(
      actions.actionDone({
        txid: txid
      })
    )
    yield put(
      snackbarsActions.add({
        message: 'Synthetic repay successfully.',
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

export function* handleSendAction(): Generator {
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    switch (vaultSwapData.action) {
      case 'add': {
        yield* call(handleAddCollateral)
        break
      }
      case 'borrow': {
        yield* call(handleBorrow)
        break
      }
      case 'withdraw': {
        yield* call(handleWithdraw)
        break
      }
      case 'repay': {
        yield* call(handleRepay)
        break
      }
      default: {
        yield put(
          snackbarsActions.add({
            message: 'Failed to send. Please try again.',
            variant: 'error',
            persist: false
          })
        )
      }
    }
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

export function* updateSyntheticAmountUserVault(): Generator {
  const vaultsData = yield* select(vaults)
  const userVaultsData = yield* select(userVaults)
  const MINUTES_IN_YEAR = 525600
  const DENUMERATOR = new BN(10).pow(new BN(12))
  for (const [_key, userVault] of Object.entries(userVaultsData)) {
    const currentVault = vaultsData[userVault.vault.toString()]
    const difTimestamp = Math.floor(
      (Date.now() / 1000 - Number(currentVault.lastUpdate.toString())) / 60
    )
    if (difTimestamp > 1) {
      const interestRate =
        Number(printBN(currentVault.debtInterestRate.val, currentVault.debtInterestRate.scale)) *
        100
      const minuteInterestRate = interestRate / MINUTES_IN_YEAR
      const base = stringToMinDecimalBN(minuteInterestRate.toString())
      const timePeriodIterest = base.BN.add(new BN(10).pow(new BN(base.decimal + 2))).pow(
        new BN(difTimestamp)
      )
      const actualAccumulatedInterestRate = currentVault.accumulatedInterestRate.val
        .mul(timePeriodIterest)
        .div(new BN(10).pow(new BN(difTimestamp * (base.decimal + 2))))
      const diffAccumulate = actualAccumulatedInterestRate
        .mul(DENUMERATOR)
        .div(userVault.lastAccumulatedInterestRate.val)
      const currentDebt = userVault.syntheticAmount.val.mul(diffAccumulate).div(DENUMERATOR)
      yield put(
        actions.updateAmountSynthetic({
          syntheticAmount: { val: currentDebt, scale: userVault.syntheticAmount.scale },
          vault: userVault.vault
        })
      )
    }
  }
}

export function* getVaultEntryIFExist(
  synthetic: PublicKey,
  collateral: PublicKey
): SagaGenerator<VaultEntry | null> {
  const owner = yield* select(address)
  const exchangeProgram = yield* call(getExchangeProgram)
  try {
    return yield* call(
      [exchangeProgram, exchangeProgram.getVaultEntryForOwner],
      synthetic,
      collateral,
      owner
    )
  } catch (error) {
    return null
  }
}

export function* initVault(): Generator {
  const networkType = yield* select(network)
  const exchangeProgram = yield* call(getExchangeProgram)
  const vaultsState = yield* select(vaults)

  for (const vault of VAULTS_MAP[networkTypetoProgramNetwork(networkType)]) {
    const { vaultAddress } = yield* call(
      [exchangeProgram, exchangeProgram.getVaultAddress],
      vault.synthetic,
      vault.collateral
    )
    if (typeof vaultsState[vaultAddress.toString()] === 'undefined') {
      const data = yield* call(
        [exchangeProgram, exchangeProgram.getVaultForPair],
        vault.synthetic,
        vault.collateral
      )
      yield* put(
        actions.setVault({
          address: vaultAddress,
          vault: data
        })
      )
    }
  }
}

export function* initVaultEntry(): Generator {
  const exchangeProgram = yield* call(getExchangeProgram)
  const userVaultState = yield* select(userVaults)
  const networkType = yield* select(network)

  for (const vault of VAULTS_MAP[networkTypetoProgramNetwork(networkType)]) {
    const { vaultAddress } = yield* call(
      [exchangeProgram, exchangeProgram.getVaultAddress],
      vault.synthetic,
      vault.collateral
    )
    if (typeof userVaultState[vaultAddress.toString()] === 'undefined') {
      const data = yield* call(
        [exchangeProgram, exchangeProgram.getVaultForPair],
        vault.synthetic,
        vault.collateral
      )
      yield* put(
        actions.setVault({
          address: vaultAddress,
          vault: data
        })
      )
      const vaultEntry = yield* call(getVaultEntryIFExist, vault.synthetic, vault.collateral)
      if (vaultEntry !== null) {
        yield* put(actions.setUserVaults(vaultEntry))
      }
    }
  }
}

export function* addNewVaultEntryHandle(): Generator {
  const actualVaultSwap = yield* select(vaultSwap)
  const vaultEntry = yield* call(
    getVaultEntryIFExist,
    actualVaultSwap.synthetic,
    actualVaultSwap.collateral
  )
  if (vaultEntry !== null) {
    yield* put(actions.setUserVaults(vaultEntry))
  }
}

const pendingUpdates: { [x: string]: Decimal } = {}

export function* batchAssetsPrices(
  action: PayloadAction<PayloadTypes['setAssetPrice']>
): Generator {
  pendingUpdates[action.payload.address.toString()] = action.payload.price
}
export function* handleAssetPrice(): Generator {
  yield* put(actions.batchSetAssetPrice(pendingUpdates))
}

export function* assetPriceHandler(): Generator {
  yield* throttle(1000, actions.setAssetPrice, handleAssetPrice)
}
export function* assetPriceBatcher(): Generator {
  yield* takeEvery(actions.setAssetPrice, batchAssetsPrices)
}

export function* vaultSendActionHandler(): Generator {
  yield* takeEvery(actions.setVaultSwap, handleSendAction)
}
export function* updateSyntheticHandler(): Generator {
  yield* takeEvery(actions.setUserVaults, updateSyntheticAmountUserVault)
}
export function* setActualVault(): Generator {
  yield* takeEvery(actions.setActualVaultSwap, setVaultAddress)
}
export function* addNewVaultEntry(): Generator {
  yield* takeEvery(actions.setNewVaultEntryAddress, addNewVaultEntryHandle)
}
export function* initVaults(): Generator {
  yield* takeEvery(actions.initVault, initVault)
}
export function* vaultSaga(): Generator {
  yield all(
    [
      initVaults,
      updateSyntheticHandler,
      vaultSendActionHandler,
      setActualVault,
      assetPriceBatcher,
      assetPriceHandler,
      addNewVaultEntry
    ].map(spawn)
  )
}
