import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAccountAddress } from '@selectors/exchange'
import { status } from '@selectors/solanaConnection'
import { actions } from '@reducers/exchange'
import { getSystemProgram } from '@web3/connection'
import { Status } from '@reducers/solanaConnection'
import { DEFAULT_PUBLICKEY } from '@consts/static'

const ExhcangeEvents = () => {
  const dispatch = useDispatch()
  const networkStatus = useSelector(status)
  const userAccount = useSelector(userAccountAddress)
  React.useEffect(() => {
    const exchangeProgram = getSystemProgram()
    if (
      userAccount.equals(DEFAULT_PUBLICKEY) ||
      !exchangeProgram ||
      networkStatus !== Status.Initalized
    ) {
      return
    }
    const connectEvents = () => {
      exchangeProgram.account.userAccount.subscribe(userAccount, 'recent').on('change', a => {
        dispatch(actions.setUserAccountData({ shares: a.shares, collateral: a.collateral }))
      })
    }
    connectEvents()
  }, [dispatch, userAccount.toString(), networkStatus])

  return null
}

export default ExhcangeEvents
