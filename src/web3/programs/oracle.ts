import { getSolanaConnection } from '@web3/connection'
import { SolanaNetworks } from '@consts/static'
import { getSolanaWallet } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'
import { Program, Provider, Idl } from '@project-serum/anchor'
import oracleIdl from '@consts/idl/oracle.json'

let _oracle: Program
const oracleProgramId: PublicKey = new PublicKey('GVq5UAzCwrHiCBLro8iJfsd6bZMBvEGB1RscqrZhzSxW')

export const getOracleProgram = () => {
  if (_oracle) {
    return _oracle
  }
  const _provider = new Provider(getSolanaConnection(SolanaNetworks.DEV), getSolanaWallet(), {
    skipPreflight: true
  })
  _oracle = new Program(oracleIdl as Idl, oracleProgramId, _provider)

  return _oracle
}
