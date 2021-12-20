import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { network, status } from '@selectors/solanaConnection'
import { actions } from '@reducers/exchange'
import { actions as actionsVault } from '@reducers/vault'
import { Status } from '@reducers/solanaConnection'
import { getCurrentExchangeProgram } from '@web3/programs/exchange'
import { getCurrentSolanaConnection, networkTypetoProgramNetwork } from '@web3/connection'
import { address } from '@selectors/solanaWallet'
import { vaultSwap } from '@selectors/vault'
import { VAULTS_MAP } from '@consts/consts'
import { updateSyntheticAmountUserVault } from '@sagas/vault'

const VaultEvents = () => {
  const dispatch = useDispatch()
  const networkStatus = useSelector(status)
  const networkType = useSelector(network)
  const exchangeProgram = getCurrentExchangeProgram()
  const owner = useSelector(address)
  const actualVaultEntry = useSelector(vaultSwap)

  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()

    if (!exchangeProgram || networkStatus !== Status.Initialized || !connection) {
      return
    }
    const connectEvents = async () => {
      exchangeProgram.onStateChange(state => {
        dispatch(actions.setState(state))
      })
      console.log('event')
      VAULTS_MAP[networkTypetoProgramNetwork(networkType)].map(async vault => {
        const { vaultAddress } = await exchangeProgram.getVaultAddress(
          vault.synthetic,
          vault.collateral
        )
        const data = await exchangeProgram.getVaultForPair(vault.synthetic, vault.collateral)
        dispatch(
          actionsVault.setVault({
            address: vaultAddress,
            vault: data
          })
        )
        exchangeProgram.onVaultChange(actualVaultEntry.vaultAddress, state => {
          dispatch(
            actionsVault.setVault({
              address: actualVaultEntry.vaultAddress,
              vault: state
            })
          )
        })

        const vaultEntryAmount = await exchangeProgram.getVaultEntryForOwner(
          vault.synthetic,
          vault.collateral,
          owner
        )
        dispatch(actionsVault.setUserVaults(vaultEntryAmount))

        const { vaultEntryAddress } = await exchangeProgram.getVaultEntryAddress(
          actualVaultEntry.synthetic,
          actualVaultEntry.collateral,
          owner
        )
        exchangeProgram.onVaultEntryChange(vaultEntryAddress, state => {
          dispatch(actionsVault.setUserVaults(state))
        })
      })
      updateSyntheticAmountUserVault()
    }

    connectEvents().catch(error => console.log(error))
  }, [dispatch, exchangeProgram, networkStatus, owner, actualVaultEntry.vaultAddress])

  //   React.useEffect(() => {
  //     const connection = getCurrentSolanaConnection()

  //     if (!exchangeProgram || networkStatus !== Status.Initialized || !connection) {
  //       return
  //     }
  //     const connectEvents = async () => {
  //       exchangeProgram.onStateChange(state => {
  //         dispatch(actions.setState(state))
  //       })
  //       exchangeProgram.onVaultChange(actualVaultEntry.vaultAddress, state => {
  //         dispatch(
  //           actionsVault.setVault({
  //             address: actualVaultEntry.vaultAddress,
  //             vault: state
  //           })
  //         )
  //       })
  //       const { vaultEntryAddress } = await exchangeProgram.getVaultEntryAddress(
  //         actualVaultEntry.synthetic,
  //         actualVaultEntry.collateral,
  //         owner
  //       )
  //       exchangeProgram.onVaultEntryChange(vaultEntryAddress, state => {
  //         dispatch(actionsVault.setUserVaults(state))
  //       })
  //     }

  //     connectEvents().catch(error => console.log(error))
  //   }, [dispatch, exchangeProgram, networkStatus, actualVaultEntry.vaultAddress])
  return null
}

export default VaultEvents
