import EventEmitter from 'eventemitter3'
import { PublicKey, Transaction } from '@solana/web3.js'
// import { notify } from '../../utils/notifications'
import { WalletAdapter } from './types'
import { DEFAULT_PUBLICKEY } from '@consts/static'

type PhantomEvent = 'disconnect' | 'connect'
type PhantomRequestMethod = 'connect' | 'disconnect' | 'signTransaction' | 'signAllTransactions'

interface PhantomProvider {
  publicKey?: PublicKey
  isConnected?: boolean
  autoApprove?: boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  on: (event: PhantomEvent, handler: (args: any) => void) => void
  request: (method: PhantomRequestMethod, params: any) => Promise<any>
}

export class PhantomWalletAdapter extends EventEmitter implements WalletAdapter {
  _provider: PhantomProvider | undefined

  constructor() {
    super()
    this.connect = this.connect.bind(this)
  }

  get connected() {
    return this._provider?.isConnected || false
  }

  get autoApprove() {
    return this._provider?.autoApprove || false
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this._provider) {
      return transactions
    }

    return await this._provider.signAllTransactions(transactions)
  }

  get publicKey() {
    return this._provider?.publicKey || DEFAULT_PUBLICKEY
  }

  async signTransaction(transaction: Transaction) {
    if (!this._provider) {
      return transaction
    }

    return await this._provider.signTransaction(transaction)
  }

  connect = async () => {
    if (this._provider) {
      return
    }

    let provider: PhantomProvider
    if ((window as any)?.solana?.isPhantom) {
      provider = (window as any).solana
    } else {
      window.open('https://phantom.app/', '_blank')
      // notify({
      //   message: 'Phantom Error',
      //   description: 'Please install Phantom wallet from Chrome '
      // })
      return
    }

    provider.on('connect', () => {
      this._provider = provider
      this.emit('connect')
    })

    if (!provider.isConnected) {
      await provider.connect()
    }

    this._provider = provider
  }

  disconnect() {
    if (this._provider) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._provider.disconnect()
      this._provider = undefined
      this.emit('disconnect')
    }
  }
}
