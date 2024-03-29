import EventEmitter from 'eventemitter3'
import { PublicKey, Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { AppSolana, clearPersistedSessionId, clearPersistedSessionPublicKey, getPersistedSessionId, getPersistedSessionPublicKey, NETWORK, NightlyConnectModal, setPersistedSessionPublicKey } from '@nightlylabs/connect-solana'

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
        let persistedId = getPersistedSessionId()
        const persistedPubkey = getPersistedSessionPublicKey()

        if (persistedId !== null && persistedPubkey === null) {
          clearPersistedSessionId()
          persistedId = null
        }

        const app = await AppSolana.build({
          appMetadata: {
            additionalInfo: '',
            application: 'Synthetify',
            description: 'Synthetify - The Future of Synthetic Assests',
            icon: 'https://synthetify.io/icons/sny.png'
          },
          onUserConnect: data => {
            this._publicKey = data.publicKey
            setPersistedSessionPublicKey(data.publicKey.toString())
            this._connected = true
            this.emit('connect')
            this._modal.closeModal()
          }
        })

        this._app = app

        if (persistedId === app.sessionId && persistedPubkey !== null) {
          this._publicKey = new PublicKey(persistedPubkey)
          this._connected = true
          this.emit('connect')

          return
        }
      }

      this._modal.openModal(this._app.sessionId, NETWORK.SOLANA)
    } catch (error) {
      console.log(error)
    }
  }

  async disconnect() {
    if (this._publicKey) {
      this._app = undefined
      this._publicKey = DEFAULT_PUBLICKEY
      this._connected = false
      clearPersistedSessionId()
      clearPersistedSessionPublicKey()
      this.emit('disconnect')
    }
  }
}
