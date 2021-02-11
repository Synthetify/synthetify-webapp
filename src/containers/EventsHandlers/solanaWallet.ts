import React, { useState } from 'react'
import * as R from 'remeda'
import { useDispatch, useSelector } from 'react-redux'
import { accounts, address, status as walletStatus } from '@selectors/solanaWallet'
import { status } from '@selectors/solanaConnection'
import { actions } from '@reducers/solanaWallet'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { getCurrentSolanaConnection } from '@web3/connection'
import { Status } from '@reducers/solanaConnection'
import { parseTokenAccountData } from '@web3/data'

const SolanaWalletEvents = () => {
  const dispatch = useDispatch()
  const publicKey = useSelector(address)
  const networkStatus = useSelector(status)
  // Solana Main Wallet
  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (!publicKey || !connection || networkStatus !== Status.Initalized) {
      return
    }
    const connectEvents = () => {
      connection.onAccountChange(new PublicKey(publicKey), (accountInfo: AccountInfo<Buffer>) => {
        dispatch(actions.setBalance(accountInfo.lamports))
        // console.log(accountInfo)
      })
    }
    connectEvents()
  }, [dispatch, publicKey, networkStatus])

  // Solana Tokens
  const tokensAccounts = useSelector(accounts)
  const walletStat = useSelector(walletStatus)
  const [initializedAccounts, setInitializedAccounts] = useState<Set<string>>(new Set())
  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (!connection || walletStat !== Status.Initalized || networkStatus !== Status.Initalized) {
      return
    }
    const connectEvents = () => {
      const tempSet = new Set<string>()
      R.forEachObj(tokensAccounts, tokenAccounts => {
        for (const account of tokenAccounts) {
          tempSet.add(account.address)
          if (initializedAccounts.has(account.address)) {
            continue
          }
          connection.onAccountChange(
            new PublicKey(account.address),
            (accountInfo: AccountInfo<Buffer>) => {
              const parsedData = parseTokenAccountData(accountInfo.data)
              dispatch(
                actions.setTokenBalance({
                  address: account.address,
                  programId: parsedData.token.toString(),
                  balance: parsedData.amount
                })
              )
            }
          )
        }
      })
      setInitializedAccounts(tempSet)
    }
    connectEvents()
  }, [dispatch, tokensAccounts, networkStatus, walletStat])

  return null
}

export default SolanaWalletEvents
