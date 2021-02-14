import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Staking from '@components/Staking/Staking'
import { balance, address } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaWallet'
import { network } from '@selectors/solanaConnection'

export const StakingWrapper: React.FC = () => {
  const userAddress = useSelector(address)
  const userBalance = useSelector(balance)
  const currentNetwork = useSelector(network)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Staking />
    </>
  )
}

export default StakingWrapper
