import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Account from '@components/Account/Account'
import { balance, address } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaWallet'
import { actions as modalsActions } from '@reducers/modals'
import { network } from '@selectors/solanaConnection'
import Tokens from '@containers/Tokens/Tokens'
import { DEFAULT_PUBLICKEY } from '@consts/static'

export const AccountWrapper: React.FC = () => {
  const userAddress = useSelector(address)
  const userBalance = useSelector(balance)
  const currentNetwork = useSelector(network)
  const dispatch = useDispatch()
  return (
    <>
      <Account
        network={currentNetwork}
        address={userAddress.toString()}
        balance={userBalance}
        onSend={() => {
          dispatch(modalsActions.openSend({ tokenAddress: DEFAULT_PUBLICKEY }))
        }}
        onAirdrop={() => {
          dispatch(actions.airdrop())
        }}
      />
      <Tokens></Tokens>
    </>
  )
}

export default AccountWrapper
