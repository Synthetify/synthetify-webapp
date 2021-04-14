import {
  call,
  takeLeading,
  SagaGenerator,
  put,
  takeEvery,
  spawn,
  all,
  select
} from 'typed-redux-saga'

import { actions, PayloadTypes } from '@reducers/solanaWallet'
import { getConnection } from './connection'
import { getSolanaWallet, connectWallet } from '@web3/wallet'
import {
  Account,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction
} from '@solana/web3.js'
import { Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PayloadAction } from '@reduxjs/toolkit'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { Status } from '@reducers/solanaConnection'
import { actions as exchangeActions } from '@reducers/exchange'
// import { createToken } from './token'
import { BN } from '@project-serum/anchor'
import { getCollateralTokenAirdrop } from './exchange'
import { tou64 } from '@consts/utils'
import { WalletAdapter } from '@web3/adapters/types'
import { connectExchangeWallet, getExchangeProgram } from '@web3/programs/exchange'
import { getManagerProgram } from '@web3/programs/manager'
import { state } from '@selectors/exchange'
export function* getWallet(): SagaGenerator<WalletAdapter> {
  const wallet = yield* call(getSolanaWallet)
  return wallet
}
export function* getBalance(pubKey: PublicKey): SagaGenerator<BN> {
  const connection = yield* call(getConnection)
  const balance = yield* call([connection, connection.getBalance], pubKey)
  return new BN(balance)
}
export function* handleTransaction(
  action: PayloadAction<PayloadTypes['addTransaction']>
): Generator {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  // Send token
  try {
    if (action.payload.token && action.payload.accountAddress) {
      // const signature = yield* call(
      //   sendToken,
      //   action.payload.accountAddress,
      //   action.payload.recipient,
      //   action.payload.amount * 1e9,
      //   action.payload.token
      // )
      // yield put(
      //   actions.setTransactionTxid({
      //     txid: signature,
      //     id: action.payload.id
      //   })
      // )
    } else {
      // Send SOL
      // const signature = yield* call(
      //   [connection, connection.sendTransaction],
      //   new Transaction().add(
      //     SystemProgram.transfer({
      //       fromPubkey: wallet.publicKey,
      //       toPubkey: new PublicKey(action.payload.recipient),
      //       lamports: action.payload.amount * 1e9
      //     })
      //   ),
      //   [wallet],
      //   {
      //     preflightCommitment: 'singleGossip'
      //   }
      // )
      // yield put(
      //   actions.setTransactionTxid({
      //     txid: signature,
      //     id: action.payload.id
      //   })
      // )
    }
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.setTransactionError({
        error: error,
        id: action.payload.id
      })
    )
  }
}
interface IparsedTokenInfo {
  mint: string
  owner: string
  tokenAmount: {
    amount: string
    decimals: number
    uiAmount: number
  }
}
export function* fetchTokensAccounts(): Generator {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const tokensAccounts = yield* call(
    [connection, connection.getParsedTokenAccountsByOwner],
    wallet.publicKey,
    {
      programId: TOKEN_PROGRAM_ID
    }
  )
  for (const account of tokensAccounts.value) {
    const info: IparsedTokenInfo = account.account.data.parsed.info
    yield* put(
      actions.addTokenAccount({
        programId: new PublicKey(info.mint),
        balance: new BN(info.tokenAmount.amount),
        address: account.pubkey,
        decimals: info.tokenAmount.decimals
      })
    )
  }
}

export function* getToken(tokenAddress: PublicKey): SagaGenerator<Token> {
  const connection = yield* call(getConnection)
  const token = new Token(connection, tokenAddress, TOKEN_PROGRAM_ID, new Account())
  return token
}

export function* handleAirdrop(): Generator {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  yield* call([connection, connection.requestAirdrop], wallet.publicKey, 6.9 * 1e9)
  const balance = yield* call([connection, connection.getBalance], wallet.publicKey)
  if (balance < 1e8) {
    yield* call(sleep, 2000)
  }

  // let retries = 30
  // for (;;) {
  //   yield* call(sleep, 2000)
  //   // eslint-disable-next-line eqeqeq
  //   if (6.9 * 1e9 <= (yield* call([connection, connection.getBalance], wallet.publicKey))) {
  //   }
  //   if (--retries <= 0) {
  //     break
  //   }
  // }
  yield* call(getCollateralTokenAirdrop)
  yield put(
    snackbarsActions.add({
      message: 'You will soon receive airdrop',
      variant: 'success',
      persist: false
    })
  )
}
// export function* getTokenProgram(pubKey: PublicKey): SagaGenerator<number> {
//   const connection = yield* call(getConnection)
//   const balance = yield* call(, pubKey)
//   return balance
// }
export function* sendToken(
  from: PublicKey,
  target: PublicKey,
  amount: BN,
  tokenAddress: PublicKey
): SagaGenerator<string> {
  const token = yield* call(getToken, tokenAddress)
  const signature = yield* call(
    [token, token.transfer],
    from,
    target,
    new Account(),
    [],
    tou64(amount)
  )
  return signature
}
export function* signAndSend(wallet: WalletAdapter, tx: Transaction): SagaGenerator<string> {
  const connection = yield* call(getConnection)
  const blockhash = yield* call([connection, connection.getRecentBlockhash])
  tx.feePayer = wallet.publicKey
  tx.recentBlockhash = blockhash.blockhash
  const signedTx = yield* call([wallet, wallet.signTransaction], tx)
  const signature = yield* call([connection, connection.sendRawTransaction], signedTx.serialize())
  return signature
}
export function* createAccount(tokenAddress: PublicKey): SagaGenerator<PublicKey> {
  const wallet = yield* call(getWallet)
  const associatedAccount = yield* call(
    Token.getAssociatedTokenAddress,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    tokenAddress,
    wallet.publicKey
  )
  const ix = Token.createAssociatedTokenAccountInstruction(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    tokenAddress,
    associatedAccount,
    wallet.publicKey,
    wallet.publicKey
  )

  yield* call(signAndSend, wallet, new Transaction().add(ix))
  yield* put(
    actions.addTokenAccount({
      programId: tokenAddress,
      balance: new BN(0),
      address: associatedAccount,
      decimals: 6
    })
  )
  yield* call(sleep, 1000) // Give time to subscribe to new token
  return associatedAccount
}

export function* init(): Generator {
  yield* put(actions.setStatus(Status.Init))
  const wallet = yield* call(getWallet)
  // const balance = yield* call(getBalance, wallet.publicKey)
  yield* put(actions.setAddress(wallet.publicKey.toString()))
  const balance = yield* call(getBalance, wallet.publicKey)
  yield* put(actions.setBalance(balance))
  yield* put(actions.setStatus(Status.Initalized))
  yield* call(fetchTokensAccounts)
  const exchangeProgram = yield* call(getExchangeProgram)
  const address = yield* call(
    [exchangeProgram, exchangeProgram.getExchangeAccountAddress],
    wallet.publicKey
  )
  try {
    const account = yield* call([exchangeProgram, exchangeProgram.getExchangeAccount], address)

    yield* put(
      exchangeActions.setExchangeAccount({
        address: address,
        collateralShares: account.collateralShares,
        debtShares: account.debtShares
      })
    )
  } catch (error) {}
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export function* sendSol(amount: BN, recipient: PublicKey): SagaGenerator<string> {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: recipient,
      lamports: amount.toNumber()
    })
  )
  const txid = yield* call(sendAndConfirmTransaction, connection, transaction, [new Account()])
  return txid
}

export function* handleConnect(): Generator {
  // TODO add side effects
  yield* call(connectWallet)
  yield* call(init)
  yield* call(connectExchangeWallet)
  // const managerProgram = yield* call(getManagerProgram)
  // const stateExchange = yield* select(state)
  // const ix = yield* call(
  //   [managerProgram, managerProgram.updatePricesInstruction],
  //   stateExchange.assetsList
  // )
  // console.log(ix)
  // const wallet = yield* call(getWallet)
  // const tx = new Transaction().add(ix)
  // const connection = yield* call(getConnection)
  // const blockhash = yield* call([connection, connection.getRecentBlockhash])
  // tx.feePayer = wallet.publicKey
  // tx.recentBlockhash = blockhash.blockhash
  // const signedTx = yield* call([wallet, wallet.signTransaction], tx)
  // const signature = yield* call([connection, connection.sendRawTransaction], signedTx.serialize())
  // console.log(signature)
}
export function* connectHandler(): Generator {
  yield takeLeading(actions.connect, handleConnect)
}
export function* airdropSaga(): Generator {
  yield takeLeading(actions.airdrop, handleAirdrop)
}

export function* transactionsSaga(): Generator {
  yield takeEvery(actions.addTransaction, handleTransaction)
}
export function* initSaga(): Generator {
  yield takeLeading(actions.initWallet, init)
}
export function* walletSaga(): Generator {
  yield all([transactionsSaga, initSaga, airdropSaga, connectHandler].map(spawn))
}
