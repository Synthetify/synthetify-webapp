import React from 'react'
import Header from '@components/HeaderRedesign/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { address, status } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaConnection'
import { SolanaNetworks } from '@consts/static'
import { Status, actions as walletActions } from '@reducers/solanaWallet'

export const HeaderRedesignWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletAddress = useSelector(address)
  const walletStatus = useSelector(status)
  const location = useLocation()

  return (
    <Header
      address={walletAddress}
      onNetworkSelect={(chosen: string) => {
        dispatch(actions.setNetwork(chosen as SolanaNetworks))
      }}
      onWalletSelect={(chosen) => {
        dispatch(walletActions.connect(chosen))
      }}
      landing={location.pathname.substr(1)}
      walletConnected={walletStatus === Status.Initalized}
      onFaucet={() => { dispatch(walletActions.airdrop()) }}
      onDisconnectWallet={() => { dispatch(walletActions.disconnect()) }}
    />
  )
}

export default HeaderRedesignWrapper
