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
    console.log(sessionWallet)
    if (sessionWallet === 'phantom') {
      setTypeOfWallet(WalletType.PHANTOM)
      dispatch(walletActions.connect(WalletType.PHANTOM))
    } else if (sessionWallet === 'sollet') {
      setTypeOfWallet(WalletType.SOLLET)
      dispatch(walletActions.connect(WalletType.SOLLET))
    } else {
      setTypeOfWallet(WalletType.MATHWALLET)
      dispatch(walletActions.connect(WalletType.MATHWALLET))
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
