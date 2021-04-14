import { WalletAdapter } from './adapters/types'
import { PhantomWalletAdapter } from './adapters/phantom'

let _wallet: WalletAdapter
const getSolanaWallet = (): WalletAdapter => {
  if (_wallet) {
    return _wallet
  }
  _wallet = new PhantomWalletAdapter()
  return _wallet
}
// Here we will pass wallet type right
const connectWallet = async (): Promise<WalletAdapter> => {
  await _wallet.connect()
  return _wallet
}

export { getSolanaWallet, connectWallet }
