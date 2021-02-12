import { Connection, PublicKey } from '@solana/web3.js'
import { Provider, setProvider, Wallet, Program, Idl } from '@project-serum/anchor'
import { getSolanaWallet } from './wallet'
import { SolanaNetworks } from '@consts/static'
import oracleIdl from '@consts/idl/oracle.json'
import systemIdl from '@consts/idl/system.json'

const ORACLE_ADDRESS = new PublicKey('GcDRBDM56Ex6mczDGzBoVD4Vfd1GK4M1ftLwUNP2jk7Q') // DEVNET
const SYSTEM_ADDRESS = new PublicKey('99z1uuDEShWMbShEfMUo4GBxtZFTKyqdNr3KoqvTzv2Y')
// const ORACLE_ADDRESS = new PublicKey('C428JakvgvTu5hnzFSEiLRCxRcij22DcTRx5jczwdQhp') //TESTNET
// const SYSTEM_ADDRESS = new PublicKey('4dZnVVf6d4Tm2Q7U3BVncEL4camgfuy4T5fx5XE4U8DC')

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
const getSystemProgram = (): Program => {
  if (_system) {
    return _system
  }
  const provider = getSolanaProvider()
  _system = new Program(systemIdl as Idl, SYSTEM_ADDRESS, provider)
  return _system
}
const getOracleProgram = (): Program => {
  if (_oracle) {
    return _oracle
  }
  const provider = getSolanaProvider()
  _oracle = new Program(oracleIdl as Idl, ORACLE_ADDRESS, provider)
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
