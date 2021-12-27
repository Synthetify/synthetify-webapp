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

      VAULTS_MAP[networkTypetoProgramNetwork(networkType)].map(async vault => {
        if (vault.collateral.toString() !== '76qqFEokX3VgTxXX8dZYkDMijFtoYbJcxZZU4DgrDnUF') {
          const { vaultAddress } = await exchangeProgram.getVaultAddress(
            vault.synthetic,
            vault.collateral
          )

          if (typeof vaultsState[vaultAddress.toString()] === 'undefined') {
            const data = await exchangeProgram.getVaultForPair(vault.synthetic, vault.collateral)
            
            dispatch(
              actionsVault.setVault({
                address: vaultAddress,
                vault: data
              })
            )
            // console.log('subscribe to v/ault', vaultAddress.toBase58())

            exchangeProgram.onVaultChange(vaultAddress, state => {
              console.log('vault changed', state)
              // console.log(state)
              dispatch(
                actionsVault.setVault({
                  address: vaultAddress,
                  vault: state
                })
              )
            })
            // console.log('subscribe to vault', vaultAddress)

            connection.onAccountChange(data.collateralPriceFeed, priceInfo => {
              console.log('work')
              const parsedData = parsePriceData(priceInfo.data)
              parsedData.price &&
                dispatch(
                  actionsVault.setAssetPrice({
                    address: vault.collateral.toString(),
                    price: new BN(parsedData.price * 10 ** data.collateralAmount.scale)
                  })
                )
            })

            void exchangeProgram
              .getVaultEntryForOwner(vault.synthetic, vault.collateral, owner)
              .then(response => {
                dispatch(actionsVault.setUserVaults(response))
                // console.log('added vaultEntry')
              })
              .catch(() => {
                // console.log('vaultEntry not exist')
              })
          }
        }
      })
    }
    connectEvents().catch(error => console.log(error))
  }, [dispatch, exchangeProgram, networkStatus, walletStat])

  React.useEffect(() => {
    // const connection = getCurrentSolanaConnection()
    // if (
    //   !exchangeProgram ||
    //   walletStat !== Status.Initialized ||
    //   networkStatus !== Status.Initialized ||
    //   !connection
    // ) {
    //   dispatch(actionsVault.clearUserVault())
    //   return
    // }
    if (newVaultEntryAddressState === DEFAULT_PUBLICKEY) {
      return
    }
    const connectEvents = async () => {
      exchangeProgram.onStateChange(state => {
        dispatch(actions.setState(state))
      })
      VAULTS_MAP[networkTypetoProgramNetwork(networkType)].map(async vault => {
        if (vault.collateral.toString() !== '76qqFEokX3VgTxXX8dZYkDMijFtoYbJcxZZU4DgrDnUF') {
          void exchangeProgram
            .getVaultEntryForOwner(vault.synthetic, vault.collateral, owner)
            .then(response => {
              dispatch(actionsVault.setUserVaults(response))
              // console.log('added vaultEntry newAddress')
            })
            .catch(() => {
              // console.log('vaultEntry not exist')
            })
        }
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
              console.log('vaultEntry changed', state)
              dispatch(actionsVault.setUserVaults(state))
            })
            console.log('subscribe to vaultEntry', response.vaultEntryAddress)
          })
          .catch(() => {})
      })
      setInitializedVaultEntry(tempSet)
      // updateSyntheticAmountUserVault()
    }
    connectEvents().catch(error => console.log(error))
  }, [dispatch, exchangeProgram, networkStatus, userVaultsState])

  const [initializedAsset, setInitializedAsset] = useState<Set<string>>(new Set())
  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (!connection || walletStat !== Status.Initialized || networkStatus !== Status.Initialized) {
      return
    }

    const connectEvents = () => {
      const tempSet = new Set<string>()
      R.forEachObj(vaultsState, vault => {
        tempSet.add(vault.collateral.toString())
        if (initializedAsset.has(vault.collateral.toString())) {
          console.log('juz dodane')
          return
        }
        console.log('subscribe price')
        console.log(vault.collateralPriceFeed.toString())
        connection.onAccountChange(vault.collateralPriceFeed, priceInfo => {
          console.log('work')
          const parsedData = parsePriceData(priceInfo.data)
          parsedData.price &&
            dispatch(
              actionsVault.setAssetPrice({
                address: vault.collateral.toString(),
                price: new BN(parsedData.price * 10 ** vault.collateralAmount.scale)
              })
            )
        })
      })
      setInitializedAsset(tempSet)
    }

    connectEvents()
  }, [dispatch, Object.keys(vaultsState).length, networkStatus])

  return null
}

export default VaultEvents
