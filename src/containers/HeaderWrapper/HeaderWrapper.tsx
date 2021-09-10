import React, { useEffect, useState } from 'react'
import Header from '@components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { address, status } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaConnection'
import { Status, actions as walletActions } from '@reducers/solanaWallet'
import { WalletType } from '@web3/wallet'
import { network } from '@selectors/solanaConnection'
import { DEFAULT_PUBLICKEY } from '@consts/static'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletAddress = useSelector(address)
  const walletStatus = useSelector(status)
  const currentNetwork = useSelector(network)
  const location = useLocation()
  const [typeOfWallet, setTypeOfWallet] = useState<WalletType>(WalletType.PHANTOM)

  useEffect(() => {
    const sessionWallet = sessionStorage.getItem('SYNTHETIFY_SESSION_WALLET')

    if (sessionWallet === 'phantom' || sessionWallet === 'sollet') {
      setTypeOfWallet(sessionWallet === 'phantom' ? WalletType.PHANTOM : WalletType.SOLLET)
      dispatch(walletActions.connect(sessionWallet === 'phantom' ? WalletType.PHANTOM : WalletType.SOLLET))
    }
  }, [])

  return (
    <Header
      address={walletAddress}
      onNetworkSelect={(chosen) => {
        dispatch(actions.setNetwork(chosen))
      }}
      onWalletSelect={(chosen) => {
        if (walletAddress.equals(DEFAULT_PUBLICKEY)) {
          setTypeOfWallet(chosen)
        }
        dispatch(walletActions.connect(chosen))
      }}
      landing={location.pathname.substr(1)}
      walletConnected={walletStatus === Status.Initialized}
      onFaucet={() => { dispatch(walletActions.airdrop()) }}
      onDisconnectWallet={() => { dispatch(walletActions.disconnect()) }}
      typeOfNetwork={currentNetwork}
      typeOfWallet={typeOfWallet}
    />
  )
}

export default HeaderWrapper
