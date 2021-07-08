import React, { useState } from 'react'
import Header from '@components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { address, status } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaConnection'
import { DEFAULT_PUBLICKEY, SolanaNetworks } from '@consts/static'
import { Status, actions as walletActions } from '@reducers/solanaWallet'
import { WalletType } from '@web3/wallet'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletAddress = useSelector(address)
  const walletStatus = useSelector(status)
  const location = useLocation()
  const [typeOfWallet, setTypeOfWallet] = useState<'phantom' | 'sollet'>('phantom')

  return (
    <Header
      address={walletAddress}
      onNetworkSelect={(chosen: string) => {
        dispatch(actions.setNetwork(chosen as SolanaNetworks))
      }}
      onWalletSelect={(chosen) => {
        if (walletAddress.equals(DEFAULT_PUBLICKEY)) {
          setTypeOfWallet(chosen === WalletType.PHANTOM ? 'phantom' : 'sollet')
        }

        dispatch(walletActions.connect(chosen))
      }}
      landing={location.pathname.substr(1)}
      walletConnected={walletStatus === Status.Initalized}
      onFaucet={() => { dispatch(walletActions.airdrop()) }}
      onDisconnectWallet={() => { dispatch(walletActions.disconnect()) }}
      typeOfWallet={typeOfWallet}
    />
  )
}

export default HeaderWrapper
