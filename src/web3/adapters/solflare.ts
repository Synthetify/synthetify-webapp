import EventEmitter from 'eventemitter3'
import { PublicKey, Transaction } from '@solana/web3.js'
// import { notify } from '../../utils/notifications'
import { WalletAdapter } from './types'
import { DEFAULT_PUBLICKEY } from '@consts/static'

type SolflareEvent = 'disconnect' | 'connect'
type SolflareRequestMethod = 'connect' | 'disconnect' | 'signTransaction' | 'signAllTransactions'

interface SolflareProvider {
  publicKey?: PublicKey
  isConnected?: boolean
  autoApprove?: boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  on: (event: SolflareEvent, handler: (args: any) => void) => void
  request: (method: SolflareRequestMethod, params: any) => Promise<any>
}

export class SolflareWalletAdapter extends EventEmitter implements WalletAdapter {
  _provider: SolflareProvider | undefined

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

    let provider: SolflareProvider = (window as any).solflare
    if ((window as any)?.solflare?.isSolFlare) {
      provider = (window as any).solflare
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
