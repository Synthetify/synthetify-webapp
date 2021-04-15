import {
  getSolanaConnection,
  getSolanaNetwork,
  solanaNetworktoProgramNetwork
} from '@web3/connection'
import { SolanaNetworks } from '@consts/static'
import { getSolanaWallet } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'
import { Program, Provider, Idl } from '@project-serum/anchor'
import oracleIdl from '@consts/idl/oracle.json'
import { Network } from '@synthetify/sdk'
import { DEV_NET, TEST_NET } from '@synthetify/sdk/lib/network'

let _oracle: Program
const oracleProgramId: PublicKey = new PublicKey('7aYbRN3RN7vvPvyr3igRtcRtgns6LDMUKf3MPxKFe4MG')

export const getOracleProgram = () => {
  if (_oracle) {
    return _oracle
  }
  const solanaNetwork = getSolanaNetwork()
  const net = solanaNetworktoProgramNetwork(solanaNetwork)
  let oracleProgram: PublicKey
  switch (net) {
    case Network.DEV:
      oracleProgram = DEV_NET.oracle
      break
    case Network.LOCAL:
      oracleProgram = oracleProgramId
      break
    case Network.TEST:
      oracleProgram = TEST_NET.oracle
      break
    default:
      oracleProgram = oracleProgramId
      break
  }
  const _provider = new Provider(getSolanaConnection(solanaNetwork), getSolanaWallet(), {
    skipPreflight: true
  })
  _oracle = new Program(oracleIdl as Idl, oracleProgram, _provider)

  return _oracle
}
