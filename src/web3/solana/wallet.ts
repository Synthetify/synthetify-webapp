import { Account } from '@solana/web3.js'
import { SolanaNetworks } from './connection'

let _wallet: Account
const TokenProgramMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  [SolanaNetworks.TEST]: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  [SolanaNetworks.MAIN]: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
}
const getSolanaWallet = async (): Promise<Account> => {
  if (_wallet) {
    return _wallet
  }
  const privKey = localStorage.getItem('privKey')
  if (privKey === null) {
    const wallet = new Account()
    localStorage.setItem('privKey', wallet.secretKey.toString())
    return wallet
  } else {
    const wallet = new Account(privKey.split(',').map(item => parseInt(item)))
    return wallet
  }
}

export { getSolanaWallet, TokenProgramMap }
