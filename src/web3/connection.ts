import { Connection, PublicKey } from '@solana/web3.js'
import { Provider, setProvider, Program, Idl } from '@project-serum/anchor'
import { getSolanaWallet } from './wallet'
import { SolanaNetworks } from '@consts/static'
import oracleIdl from '@consts/idl/oracle.json'
import systemIdl from '@consts/idl/system.json'

export const networkToSystemAddress = (network: SolanaNetworks) => {
  switch (network) {
    case SolanaNetworks.DEV:
      return new PublicKey('95tSv88thk5XPCXFaEuGbKUBuiHHVNaQr1m61xgu72p8')

    case SolanaNetworks.TEST:
      return new PublicKey('BvdMp1EL3Pep5xVUjpmFv3YMmKZM25QqomuevVbuoZwH')

    default:
      return new PublicKey('95tSv88thk5XPCXFaEuGbKUBuiHHVNaQr1m61xgu72p8')
  }
}
export const networkToOracleAddress = (network: SolanaNetworks) => {
  switch (network) {
    case SolanaNetworks.DEV:
      return new PublicKey('2DZFhZtw94pnyoXuLfovtYZwtv1ZBLqsr3va65KKVCsz')

    case SolanaNetworks.TEST:
      return new PublicKey('9A1kwrqLzpt3992bKs4bkfS7TMRxaCgM4oNKisvXJxSz')

    default:
      return new PublicKey('2DZFhZtw94pnyoXuLfovtYZwtv1ZBLqsr3va65KKVCsz')
  }
}
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
let _oracle: Program
let _system: Program

const getSolanaConnection = (url: SolanaNetworks): Connection => {
  if (_connection && _network === url) {
    return _connection
  }
  _connection = new Connection('http://127.0.0.1:8899')
  _network = url
  _provider = new Provider(_connection, getSolanaWallet(), {
    // preflightCommitment: 'recent',
    skipPreflight: true,
    commitment: 'singleGossip'
  })
  _system = new Program(systemIdl as Idl, networkToSystemAddress(_network), _provider)
  _oracle = new Program(oracleIdl as Idl, networkToOracleAddress(_network), _provider)

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
    _provider = new Provider(connection, getSolanaWallet(), Provider.defaultOptions())
    return _provider
  }
  _provider = new Provider(_connection, getSolanaWallet(), Provider.defaultOptions())
  return _provider
}
const getSystemProgram = (): Program => {
  if (_system) {
    return _system
  }
  const provider = getSolanaProvider()
  _system = new Program(systemIdl as Idl, networkToSystemAddress(_network), provider)
  return _system
}
const getOracleProgram = (): Program => {
  if (_oracle) {
    return _oracle
  }
  const provider = getSolanaProvider()
  _oracle = new Program(oracleIdl as Idl, networkToOracleAddress(_network), provider)
  return _oracle
}

export {
  getSolanaConnection,
  SolanaNetworks,
  getCurrentSolanaConnection,
  getSolanaProvider,
  getSystemProgram,
  getOracleProgram
}
