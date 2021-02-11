import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Account from '@components/Account/Account'
import { balance, address } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaWallet'
import { network } from '@selectors/solanaConnection'

export const AccountWrapper: React.FC = () => {
  const userAddress = useSelector(address)
  const userBalance = useSelector(balance)
  const currentNetwork = useSelector(network)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Account
        network={currentNetwork}
        address={userAddress}
        balance={userBalance}
        onSend={() => {
          setOpen(true)
        }}
        onAirdrop={() => {
          dispatch(actions.airdrop())
        }}
      />
    </>
  )
}

export default AccountWrapper
