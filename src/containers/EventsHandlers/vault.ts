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
          vault.collateral
        )
        tempSet.add(vaultAddress.toString())
        if (!initializedVault.has(vaultAddress.toString())) {
          const currentVault = await exchangeProgram.getVaultForPair(
            vault.synthetic,
            vault.collateral
          )
          if (currentVault.collateralPriceFeed.toString() === DEFAULT_PUBLICKEY.toString()) {
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
          connection.onAccountChange(currentVault.collateralPriceFeed, priceInfo => {
            const parsedData = parsePriceData(priceInfo.data)
            parsedData.price &&
              dispatch(
                actionsVault.setAssetPrice({
                  address: vault.collateral.toString(),
                  price: {
                    val: new BN(parsedData.price * 10 ** currentVault.collateralAmount.scale),
                    scale: currentVault.collateralAmount.scale
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
    connectEvents().catch(error => console.log(error))
  }, [dispatch, exchangeProgram, networkStatus, walletStat, Object.keys(vaultsState).length])

  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (
      !exchangeProgram ||
      walletStat !== Status.Initialized ||
      networkStatus !== Status.Initialized ||
      !connection
    ) {
      return
    }
    const connectEvents = async () => {
      exchangeProgram.onStateChange(state => {
        dispatch(actions.setState(state))
      })
      const tempSet = new Set<string>()
      R.forEachObj(userVaultsState, userVault => {
        tempSet.add(userVault.vault.toString())
        if (initializedVaultEntry.has(userVault.vault.toString())) {
          return
        }
        void exchangeProgram
          .getVaultEntryAddress(
            vaultsState[userVault.vault.toString()].synthetic,
            vaultsState[userVault.vault.toString()].collateral,
            owner
          )
          .then(response => {
            exchangeProgram.onVaultEntryChange(response.vaultEntryAddress, state => {
              dispatch(actionsVault.setUserVaults(state))
            })
          })
          .catch(() => {})
      })
      setInitializedVaultEntry(tempSet)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectEvents()
  }, [dispatch, exchangeProgram, networkStatus, Object.keys(userVaultsState).length])

  return null
}

export default VaultEvents
