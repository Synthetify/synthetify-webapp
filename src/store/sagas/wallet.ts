import {
  call,
  takeLeading,
  SagaGenerator,
  put,
  spawn,
  all,
  select,
  takeLatest
} from 'typed-redux-saga'

import { actions, PayloadTypes } from '@reducers/solanaWallet'
import { getConnection } from './connection'
import { getSolanaWallet, connectWallet, disconnectWallet, WalletType } from '@web3/wallet'
import { Account, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { Status } from '@reducers/solanaConnection'
import { actions as exchangeActions } from '@reducers/exchange'
import { BN } from '@project-serum/anchor'
import { getCollateralTokenAirdrop } from './exchange'
import { tou64 } from '@consts/utils'
import { WalletAdapter } from '@web3/adapters/types'
import { connectExchangeWallet, getExchangeProgram } from '@web3/programs/exchange'
import { getTokenDetails } from './token'
import { PayloadAction } from '@reduxjs/toolkit'
import { address, status } from '@selectors/solanaWallet'
import { collaterals } from '@selectors/exchange'
import { DEFAULT_PUBLICKEY, DEFAULT_STAKING_DATA } from '@consts/static'
export function* getWallet(): SagaGenerator<WalletAdapter> {
  const wallet = yield* call(getSolanaWallet)
  return wallet
}
export function* getBalance(pubKey: PublicKey): SagaGenerator<BN> {
  const connection = yield* call(getConnection)
  const balance = yield* call([connection, connection.getBalance], pubKey)
  return new BN(balance)
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
  const walletStatus = yield* select(status)
  if (walletStatus !== Status.Initalized) {
    yield put(
      snackbarsActions.add({
        message: 'Connect your wallet first',
        variant: 'warning',
        persist: false
      })
    )
    return
  }

  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  let balance = yield* call([connection, connection.getBalance], wallet.publicKey)
  if (balance < 0.05 * 1e9) {
    yield* call([connection, connection.requestAirdrop], wallet.publicKey, 0.1 * 1e9)
    balance = yield* call([connection, connection.getBalance], wallet.publicKey)
    yield* call(sleep, 2000)
    let retries = 30
    for (;;) {
      // eslint-disable-next-line eqeqeq
      if (0.05 * 1e9 < (yield* call([connection, connection.getBalance], wallet.publicKey))) {
        break
      }
      yield* call(sleep, 2000)
      if (--retries <= 0) {
        break
      }
    }
  }

  const allCollaterals = yield* select(collaterals)
  const snyToken = Object.values(allCollaterals)[0]
  try {
    yield* call(getCollateralTokenAirdrop, snyToken.collateralAddress)
  } catch (error) {
    if (error instanceof Error && error.message === 'Signature request denied') return
    console.error(error)
    return put(
      snackbarsActions.add({
        message: 'Airdrop failed',
        variant: 'error',
        persist: false
      })
    )
  }
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
export function* sendToken(from: PublicKey, target: PublicKey, amount: BN): SagaGenerator<string> {
  const wallet = yield* call(getWallet)
  const ix = Token.createTransferInstruction(
    TOKEN_PROGRAM_ID,
    from,
    target,
    wallet.publicKey,
    [],
    tou64(amount)
  )
  const signature = yield* call(signAndSend, wallet, new Transaction().add(ix))

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
  const token = yield* call(getTokenDetails, tokenAddress.toString())
  yield* put(
    actions.addTokenAccount({
      programId: tokenAddress,
      balance: new BN(0),
      address: associatedAccount,
      decimals: token.decimals
    })
  )
  yield* call(sleep, 1000) // Give time to subscribe to new token
  return associatedAccount
}

export function* init(): Generator {
  yield* put(actions.setStatus(Status.Init))
  const wallet = yield* call(getWallet)
  // const balance = yield* call(getBalance, wallet.publicKey)
  yield* put(actions.setAddress(wallet.publicKey))
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
        collaterals: account.collaterals,
        debtShares: account.debtShares,
        userStaking: account.userStakingData
      })
    )
  } catch (error) {}
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export function* sendSol(amount: BN, recipient: PublicKey): SagaGenerator<string> {
  const wallet = yield* call(getWallet)
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: recipient,
      lamports: amount.toNumber()
    })
  )

  const txid = yield* call(signAndSend, wallet, transaction)
  return txid
}

export function* handleConnect(action: PayloadAction<PayloadTypes['connect']>): Generator {
  const walletAddress = yield* select(address)
  if (!walletAddress.equals(DEFAULT_PUBLICKEY)) {
    yield* put(
      snackbarsActions.add({
        message: 'Wallet already connected.',
        variant: 'info',
        persist: false
      })
    )
    return
  }
  try {
    yield* call(connectWallet, action.payload)
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Unable to connect to wallet.',
        variant: 'error',
        persist: false
      })
    )
    return
  }
  yield call([sessionStorage, sessionStorage.setItem], 'SYNTHETIFY_SESSION_WALLET', action.payload === WalletType.PHANTOM ? 'phantom' : 'sollet')
  yield* call(init)
  yield* call(connectExchangeWallet)
}

export function* handleDisconnect(): Generator {
  try {
    yield* call(disconnectWallet)
    yield call([sessionStorage, sessionStorage.removeItem], 'SYNTHETIFY_SESSION_WALLET')
    yield* put(actions.resetState())
    yield* put(
      exchangeActions.setExchangeAccount({
        address: DEFAULT_PUBLICKEY,
        collaterals: [],
        debtShares: new BN(0),
        userStaking: DEFAULT_STAKING_DATA
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export function* connectHandler(): Generator {
  yield takeLatest(actions.connect, handleConnect)
}

export function* disconnectHandler(): Generator {
  yield takeLatest(actions.disconnect, handleDisconnect)
}

export function* airdropSaga(): Generator {
  yield takeLeading(actions.airdrop, handleAirdrop)
}

export function* initSaga(): Generator {
  yield takeLeading(actions.initWallet, init)
}
export function* walletSaga(): Generator {
  yield all([initSaga, airdropSaga, connectHandler, disconnectHandler].map(spawn))
}
