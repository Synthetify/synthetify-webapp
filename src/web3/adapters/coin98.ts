import {
  WalletNotConnectedError,
  WalletSignTransactionError
} from '@solana/wallet-adapter-base'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import EventEmitter from 'eventemitter3'
import { WalletAdapter } from './types'
import { PublicKey, Transaction } from '@solana/web3.js'
import bs58 from 'bs58'

interface Coin98Wallet {
  isCoin98?: boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  isConnected: () => boolean
  connect: () => Promise<string[]>
  disconnect: () => Promise<void>
  request: (params: { method: string; params: string | string[] | unknown }) => Promise<{
    signature: string
    publicKey: string
  }>
}

interface Coin98Window extends Window {
  coin98?: {
    sol?: Coin98Wallet
  }
}

declare const window: Coin98Window

export interface Coin98WalletAdapterConfig {
  pollInterval?: number
  pollCount?: number
}

export class Coin98WalletAdapter extends EventEmitter implements WalletAdapter {
  _publicKey?: PublicKey
  _onProcess: boolean
  _connected: boolean
  constructor() {
    super()
    this._onProcess = false
    this._connected = false
    this.connect = this.connect.bind(this)
  }

  get connected() {
    return this._connected
  }

  get autoApprove() {
    return false
  }

  private get _provider() {
    if ((window as any)?.solana?.isMathWallet) {
      return (window as any).solana
    }
    return undefined
  }

  get publicKey() {
    return this._publicKey || DEFAULT_PUBLICKEY
  }

  connect() {
    if (this._onProcess) {
      return
    }

    if (!this._provider) {
      window.open('https://coin98.com/wallet', '_blank')
      // notify({
      //   message: 'Math Wallet Error',
      //   description: 'Please install mathwallet',
      // });
      return
    }

    this._onProcess = true
    this._provider
      .getAccount()
      .then((account: any) => {
        this._publicKey = new PublicKey(account)
        this._connected = true
        this.emit('connect', this._publicKey)
      })
      .catch(() => {
        this.disconnect()
      })
      .finally(() => {
        this._onProcess = false
      })
  }

  disconnect() {
    if (this._publicKey) {
      this._publicKey = undefined
      this._connected = false
      this.emit('disconnect')
    }
  }

  async signTransaction(transaction: Transaction): Promise<Transaction> {
    try {
      const wallet = this._provider
      if (!wallet) throw new WalletNotConnectedError()

      try {
        const response = await wallet.request({ method: 'sol_sign', params: [transaction] })

        const publicKey = new PublicKey(response.publicKey)
        const signature = bs58.decode(response.signature)

        transaction.addSignature(publicKey, signature)
        return transaction
      } catch (error: any) {
        throw new WalletSignTransactionError(error?.message, error)
      }
    } catch (error: any) {
      this.emit('error', error)
      throw error
    }
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    const signedTransactions: Transaction[] = []
    for (const transaction of transactions) {
      signedTransactions.push(await this.signTransaction(transaction))
    }
    return signedTransactions
  }
}
