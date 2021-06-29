import React from 'react'
import Header from '@components/HeaderRedesign/Header'
import { useDispatch, useSelector } from 'react-redux'
import { network } from '@selectors/solanaConnection'
import { actions } from '@reducers/solanaConnection'
import { actions as walletActions } from '@reducers/solanaWallet'
import { address } from '@selectors/solanaWallet'

export const HeaderRedesignWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletAddress = useSelector(address)

  return (
    <Header
      address={walletAddress}
      landing='staking'
    />
  )
}

export default HeaderRedesignWrapper
