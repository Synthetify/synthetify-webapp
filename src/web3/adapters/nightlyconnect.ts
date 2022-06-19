import EventEmitter from 'eventemitter3'
import { PublicKey, Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { AppSolana, NightlyConnectModal } from '@nightlylabs/connect'

export class NightlyConnectWalletAdapter extends EventEmitter implements WalletAdapter {
  _publicKey: PublicKey
  _connected: boolean
  _app: AppSolana | undefined
  _modal: NightlyConnectModal

  constructor() {
    super()
    this._connected = false
    this._publicKey = DEFAULT_PUBLICKEY
    this._modal = new NightlyConnectModal()
  }

  get autoApprove() {
    return false
  }

  get connected() {
    return this._connected
  }

  public async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this._app) {
      return transactions
    }

    return await this._app.signAllTransactions(transactions)
  }

  get publicKey() {
    return this._publicKey || DEFAULT_PUBLICKEY
  }

  async signTransaction(transaction: Transaction) {
    if (!this._app) {
      return transaction
    }

    return await this._app.signTransaction(transaction)
  }

  async connect() {
    try {
      if (!this._app) {
        const app = await AppSolana.build({
          additionalInfo: '',
          application: 'Synthetify',
          description: 'Test description',
          icon: 'https://docs.nightly.app/img/logo.png',
          url: 'ws://localhost:3000/app',
          onUserConnect: data => {
            console.log(data)
            this._publicKey = new PublicKey(Buffer.from(data.publicKey, 'hex'))
            this._connected = true
            this.emit('connect')
            this._modal.closeModal()
          }
        })

        this._app = app
      }

      this._modal.openModal(this._app.sessionId)
    } catch (error) {
      console.log(error)
      window.open('https://nightly.app/', '_blank')
    }
  }

  async disconnect() {
    if (this._publicKey) {
      this._app = undefined
      this._publicKey = DEFAULT_PUBLICKEY
      this._connected = false
      this.emit('disconnect')
    }
  }
}
