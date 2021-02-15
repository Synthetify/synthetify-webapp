import React, { useState } from 'react'
import * as R from 'remeda'
import { useDispatch, useSelector } from 'react-redux'
import { accounts, address, status as walletStatus } from '@selectors/solanaWallet'
import { userAccountAddress } from '@selectors/exchange'
import { status } from '@selectors/solanaConnection'
import { actions } from '@reducers/solanaWallet'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { getSystemProgram } from '@web3/connection'
import { Status } from '@reducers/solanaConnection'
import { parseTokenAccountData } from '@web3/data'
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
      console.log('connected')
      // TODO fix add dispatch
      exchangeProgram.account.userAccount
        .subscribe(userAccount, 'recent')
        .on('change', a => console.log(a))
    }
    connectEvents()
  }, [dispatch, userAccount.toString(), networkStatus])

  return null
}

export default ExhcangeEvents
