import { Connection } from '@solana/web3.js'
import { Provider, setProvider, Wallet } from '@project-serum/anchor'
import { getSolanaWallet } from './wallet'
import { SolanaNetworks } from '@consts/static'

export const networkToName = (network: SolanaNetworks) => {
  switch (network) {
    case SolanaNetworks.DEV:
      return 'Devnet'

    case SolanaNetworks.TEST:
      return 'Testnet'

    case SolanaNetworks.MAIN:
      return 'Mainnet'

    default:
      return 'DEVNET'
  }
}
let _connection: Connection | null = null
let _provider: Provider
let _network: SolanaNetworks

const getSolanaConnection = (url: SolanaNetworks): Connection => {
  if (_connection && _network === url) {
    return _connection
  }
  _connection = new Connection(url)
  _network = url
  // set globaly provider
  setProvider(getSolanaProvider())
  return _connection
}

const getCurrentSolanaConnection = (): Connection | null => {
  return _connection
}
const getSolanaProvider = (): Provider => {
  if (_provider) {
    return _provider
  }
  if (_connection == null) {
    const connection = getSolanaConnection(SolanaNetworks.DEV)
    _provider = new Provider(connection, new Wallet(getSolanaWallet()), Provider.defaultOptions())
    return _provider
  }
  _provider = new Provider(_connection, new Wallet(getSolanaWallet()), Provider.defaultOptions())
  return _provider
}

export { getSolanaConnection, SolanaNetworks, getCurrentSolanaConnection, getSolanaProvider }
