import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { status } from '@selectors/solanaConnection'
import { actions } from '@reducers/exchange'
import { actions as actionsVault } from '@reducers/vault'
import { Status } from '@reducers/solanaConnection'
import { getCurrentExchangeProgram } from '@web3/programs/exchange'
import { getCurrentSolanaConnection } from '@web3/connection'
import { address, status as walletStatus } from '@selectors/solanaWallet'
import { userVaults, vaults } from '@selectors/vault'
import * as R from 'remeda'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { BN } from '@project-serum/anchor'
import { parsePriceData } from '@pythnetwork/client'
const VaultEvents = () => {
  const dispatch = useDispatch()
  const networkStatus = useSelector(status)
  const walletStat = useSelector(walletStatus)
  const exchangeProgram = getCurrentExchangeProgram()
  const owner = useSelector(address)
  const vaultsState = useSelector(vaults)
  const userVaultsState = useSelector(userVaults)
  const [initializedVaultEntry, setInitializedVaultEntry] = useState<Set<string>>(new Set())
  const [initializedVault, setInitializedVault] = useState<Set<string>>(new Set())
  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (
      !exchangeProgram ||
      walletStat !== Status.Initialized ||
      networkStatus !== Status.Initialized ||
      !connection
    ) {
      dispatch(actionsVault.clearUserVault())
      return
    }
    const connectEvents = async () => {
      exchangeProgram.onStateChange(state => {
        dispatch(actions.setState(state))
      })
      const tempSet = new Set<string>()
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      R.forEachObj(vaultsState, async vault => {
        const { vaultAddress } = await exchangeProgram.getVaultAddress(
          vault.synthetic,
          vault.collateral,
          vault.vaultType
        )
        tempSet.add(vaultAddress.toString())
        if (!initializedVault.has(vaultAddress.toString())) {
          if (vault.collateralPriceFeed.toString() === DEFAULT_PUBLICKEY.toString()) {
            dispatch(
              actionsVault.setAssetPrice({
                address: vault.collateral.toString(),
                price: {
                  val: new BN(1 * 10 ** 8),
                  scale: 8
                }
              })
            )
          }
          if (vault.synthetic.toString() === '83LGLCm7QKpYZbX8q4W2kYWbtt8NJBwbVwEepzkVnJ9y') {
            dispatch(
              actionsVault.setAssetPrice({
                address: vault.synthetic.toString(),
                price: {
                  val: new BN(1 * 10 ** 8),
                  scale: 8
                }
              })
            )
          }
          connection.onAccountChange(vault.collateralPriceFeed, priceInfo => {
            const parsedData = parsePriceData(priceInfo.data)
            parsedData.price &&
              dispatch(
                actionsVault.setAssetPrice({
                  address: vault.collateral.toString(),
                  price: {
                    val: new BN(parsedData.price * 10 ** vault.collateralAmount.scale),
                    scale: vault.collateralAmount.scale
                  }
                })
              )
          })
          exchangeProgram.onVaultChange(vaultAddress, state => {
            dispatch(
              actionsVault.setVault({
                address: vaultAddress,
                vault: state
              })
            )
          })
        }
      })
      setInitializedVault(tempSet)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectEvents()
  }, [dispatch, exchangeProgram, networkStatus, walletStat, Object.keys(vaultsState).length])

  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (
      !exchangeProgram ||
      walletStat !== Status.Initialized ||
      networkStatus !== Status.Initialized ||
      Object.keys(vaultsState).length === 0 ||
      !connection
    ) {
      return
    }
    const connectEvents = async () => {
      exchangeProgram.onStateChange(state => {
        dispatch(actions.setState(state))
      })
      const tempSet = new Set<string>()
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      R.forEachObj(userVaultsState, async userVault => {
        tempSet.add(userVault.vault.toString())
        if (initializedVaultEntry.has(userVault.vault.toString())) {
          return
        }
        const { vaultEntryAddress } = await exchangeProgram.getVaultEntryAddress(
          vaultsState[userVault.vault.toString()].synthetic,
          vaultsState[userVault.vault.toString()].collateral,
          vaultsState[userVault.vault.toString()].vaultType,
          owner
        )
        exchangeProgram.onVaultEntryChange(vaultEntryAddress, state => {
          dispatch(actionsVault.setUserVaults(state))
        })
      })
      setInitializedVaultEntry(tempSet)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectEvents()
  }, [
    dispatch,
    exchangeProgram,
    networkStatus,
    walletStat,
    Object.keys(userVaultsState).length,
    Object.keys(vaultsState).length
  ])

  return null
}

export default VaultEvents
