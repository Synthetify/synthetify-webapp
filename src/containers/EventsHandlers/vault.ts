import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { network, status } from '@selectors/solanaConnection'
import { actions } from '@reducers/exchange'
import { actions as actionsVault } from '@reducers/vault'
import { Status } from '@reducers/solanaConnection'
import { getCurrentExchangeProgram } from '@web3/programs/exchange'
import { getCurrentSolanaConnection, networkTypetoProgramNetwork } from '@web3/connection'
import { address, status as walletStatus } from '@selectors/solanaWallet'
import { userVaults, vaults, vaultSwap } from '@selectors/vault'
import { updateSyntheticAmountUserVault } from '@sagas/vault'
import { VAULTS_MAP } from '@synthetify/sdk/lib/utils'

const VaultEvents = () => {
  const dispatch = useDispatch()
  const networkStatus = useSelector(status)
  const networkType = useSelector(network)
  const walletStat = useSelector(walletStatus)
  const exchangeProgram = getCurrentExchangeProgram()
  const owner = useSelector(address)
  const actualVaultEntry = useSelector(vaultSwap)
  const vaultsState = useSelector(vaults)
  const userVaultsState = useSelector(userVaults)
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
            // console.log(data.collateral.toString())
            dispatch(
              actionsVault.setVault({
                address: vaultAddress,
                vault: data
              })
            )

            exchangeProgram.onVaultChange(vaultAddress, state => {
              console.log(state)
              dispatch(
                actionsVault.setVault({
                  address: vaultAddress,
                  vault: state
                })
              )
            })
          }
          const vaultEntryAmount = await exchangeProgram.getVaultEntryForOwner(
            vault.synthetic,
            vault.collateral,
            owner
          )
          dispatch(actionsVault.setUserVaults(vaultEntryAmount))

          const { vaultEntryAddress } = await exchangeProgram.getVaultEntryAddress(
            vault.synthetic,
            vault.collateral,
            owner
          )
          if (typeof userVaultsState[vaultAddress.toString()] === 'undefined') {
            exchangeProgram.onVaultEntryChange(vaultEntryAddress, state => {
              dispatch(actionsVault.setUserVaults(state))
            })
          }
        }
      })
      updateSyntheticAmountUserVault()
    }
    connectEvents().catch(error => console.log(error))
  }, [dispatch, exchangeProgram, networkStatus, owner, actualVaultEntry.loading])

  return null
}

export default VaultEvents
