import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Staking from '@components/Staking/Staking'
import { balance, address } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaWallet'
import { network } from '@selectors/solanaConnection'
import { stakedValue, userDebtValue, userCollateralRatio } from '@selectors/exchange'

export const StakingWrapper: React.FC = () => {
  const stakedUserValue = useSelector(stakedValue)
  const userDebt = useSelector(userDebtValue)
  const collateralRatio = useSelector(userCollateralRatio)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  // console.log(stakedUserValue.toString())
  // console.log(userDebt.toString())
  console.log(collateralRatio.toString())
  return (
    <>
      <Staking collateralRatio={collateralRatio} debt={userDebt} stakedValue={stakedUserValue} />
    </>
  )
}

export default StakingWrapper
