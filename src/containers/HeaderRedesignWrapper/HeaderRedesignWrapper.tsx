import React from 'react'
import Header from '@components/HeaderRedesign/Header'
import { useDispatch, useSelector } from 'react-redux'
import { address, status } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaConnection'
import { SolanaNetworks } from '@consts/static'
import { Status, actions as walletActions } from '@reducers/solanaWallet'
import { WalletType } from '@web3/wallet'

export const HeaderRedesignWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletAddress = useSelector(address)
  const walletStatus = useSelector(status)

  const stringToWalletType = (chosen: string) => {
    if (chosen === 'phantom') {
      return WalletType.PHANTOM
    }

    return chosen === 'sollet' ? WalletType.SOLLET : WalletType.SOLLET_EXTENSION
  }

  return (
    <Header
      address={walletAddress}
      onNetworkSelect={(chosen: string) => {
        dispatch(actions.setNetwork(chosen as SolanaNetworks))
      }}
      onWalletSelect={(chosen: string) => {
        dispatch(walletActions.connect(stringToWalletType(chosen)))
      }}
      landing='staking'
      walletConnected={walletStatus === Status.Initalized}
    />
  )
}

export default HeaderRedesignWrapper
