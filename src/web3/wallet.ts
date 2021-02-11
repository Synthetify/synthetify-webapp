import { Account } from '@solana/web3.js'

let _wallet: Account
const getSolanaWallet = (): Account => {
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

export { getSolanaWallet }
