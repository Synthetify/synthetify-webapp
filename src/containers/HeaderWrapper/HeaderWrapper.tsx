import React from 'react'

import Header from '@components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { network } from '@selectors/solanaConnection'
import { actions } from '@reducers/solanaConnection'
import { actions as walletActions } from '@reducers/solanaWallet'
import { SolanaNetworks } from '@web3/connection'
import { address } from '@selectors/solanaWallet'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const currentNetwork = useSelector(network)
  const walletAddress = useSelector(address)

  return (
    <Header
      onNetworkClick={(network: SolanaNetworks) => {
        if (network !== currentNetwork) {
          dispatch(actions.setNetwork(network))
        }
      }}
      address={walletAddress.toString()}
      onConnect={wallet => {
        dispatch(walletActions.connect(wallet))
      }}
      network={currentNetwork}
    />
  )
}

export default HeaderWrapper
