import { Connection } from '@solana/web3.js'
import { SolanaNetworks } from '@consts/static'
import { Network } from '@synthetify/sdk'

export const networkToName = (network: SolanaNetworks) => {
  switch (network) {
    case SolanaNetworks.DEV:
      return 'Devnet'

    case SolanaNetworks.TEST:
      return 'Testnet'

    case SolanaNetworks.MAIN:
      return 'Mainnet'
    case SolanaNetworks.LOCAL:
      return 'Localnet'

    default:
      return 'DEVNET'
  }
}
let _connection: Connection | null = null
let _network: SolanaNetworks

const getSolanaConnection = (url: SolanaNetworks): Connection => {
  if (_connection && _network === url) {
    return _connection
  }
  _connection = new Connection(url, 'recent')
  console.log(_connection)
  _network = url

  return _connection
}
const getSolanaNetwork = (): SolanaNetworks => {
  if (_network) {
    return _network
  } else {
    throw new Error('Network not defined')
  }
}
const solanaNetworktoProgramNetwork = (solanaNetwork: SolanaNetworks): Network => {
  switch (solanaNetwork) {
    case SolanaNetworks.DEV:
      return Network.DEV
    case SolanaNetworks.LOCAL:
      return Network.LOCAL
    case SolanaNetworks.TEST:
      return Network.TEST
    case SolanaNetworks.MAIN:
      return Network.MAIN
  }
}

const getCurrentSolanaConnection = (): Connection | null => {
  return _connection
}

export {
  getSolanaConnection,
  SolanaNetworks,
  getCurrentSolanaConnection,
  getSolanaNetwork,
  solanaNetworktoProgramNetwork
}
