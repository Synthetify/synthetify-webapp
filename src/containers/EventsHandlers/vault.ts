import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { network, status } from '@selectors/solanaConnection'
import { actions } from '@reducers/exchange'
import { actions as actionsVault } from '@reducers/vault'
import { Status } from '@reducers/solanaConnection'
import { getCurrentExchangeProgram } from '@web3/programs/exchange'
import { getCurrentSolanaConnection, networkTypetoProgramNetwork } from '@web3/connection'
import { address, status as walletStatus } from '@selectors/solanaWallet'
import { newVaultEntryAddress, userVaults, vaults } from '@selectors/vault'
import { updateSyntheticAmountUserVault } from '@sagas/vault'
import { VAULTS_MAP } from '@synthetify/sdk/lib/utils'
import * as R from 'remeda'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { BN } from '@project-serum/anchor'
import { parsePriceData } from '@pythnetwork/client'
import { Vault } from '@synthetify/sdk/lib/exchange'
const VaultEvents = () => {
  const dispatch = useDispatch()
  const networkStatus = useSelector(status)
  const networkType = useSelector(network)
  const walletStat = useSelector(walletStatus)
  const exchangeProgram = getCurrentExchangeProgram()
  const owner = useSelector(address)
  const vaultsState = useSelector(vaults)
  const userVaultsState = useSelector(userVaults)
  const newVaultEntryAddressState = useSelector(newVaultEntryAddress)
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
      R.forEachObj(vaultsState, vault => {
        // let vaultAddress = DEFAULT_PUBLICKEY
        exchangeProgram
          .getVaultAddress(vault.synthetic, vault.collateral)
          .then(response => {
            tempSet.add(response.vaultAddress.toString())
            if (!initializedVault.has(response.vaultAddress.toString())) {
              let currentVault: Vault
              exchangeProgram
                .getVaultForPair(vault.synthetic, vault.collateral)
                .then(response => {
                  if (response.collateralPriceFeed.toString() === DEFAULT_PUBLICKEY.toString()) {
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
                  connection.onAccountChange(response.collateralPriceFeed, priceInfo => {
                    const parsedData = parsePriceData(priceInfo.data)
                    parsedData.price &&
                      dispatch(
                        actionsVault.setAssetPrice({
                          address: vault.collateral.toString(),
                          price: {
                            val: new BN(
                              parsedData.price * 10 ** currentVault.collateralAmount.scale
                            ),
                            scale: currentVault.collateralAmount.scale
                          }
                        })
                      )
                  })
                })
                .catch(() => {})
              exchangeProgram.onVaultChange(response.vaultAddress, state => {
                dispatch(
                  actionsVault.setVault({
                    address: response.vaultAddress,
                    vault: state
                  })
                )
              })
            }
          })
          .catch(() => {})
      })
      setInitializedVault(tempSet)
    }
    connectEvents().catch(error => console.log(error))
  }, [dispatch, exchangeProgram, networkStatus, walletStat, vaultsState])

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
    if (newVaultEntryAddressState === DEFAULT_PUBLICKEY) {
      return
    }
    const connectEvents = async () => {
      exchangeProgram.onStateChange(state => {
        dispatch(actions.setState(state))
      })
      VAULTS_MAP[networkTypetoProgramNetwork(networkType)].map(async vault => {
        void exchangeProgram
          .getVaultEntryForOwner(vault.synthetic, vault.collateral, owner)
          .then(response => {
            dispatch(actionsVault.setUserVaults(response))
          })
          .catch(() => {})
      })
    }
    connectEvents().catch(error => console.log(error))
  }, [newVaultEntryAddressState])

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
    connectEvents().catch(error => console.log(error))
  }, [dispatch, exchangeProgram, networkStatus, userVaultsState])

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
    const connectEvents = () => {
      dispatch(actionsVault.initVault())
    }
    connectEvents()
  }, [dispatch, exchangeProgram, networkStatus])

  return null
}

export default VaultEvents
