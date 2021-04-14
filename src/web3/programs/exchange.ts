import { Exchange, Network } from '@synthetify/sdk'
import { getSolanaConnection } from '@web3/connection'
import { SolanaNetworks } from '@consts/static'
import { getSolanaWallet } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'
import { getManagerProgram } from './manager'
let _exchange: Exchange
const exchangeProgramId: PublicKey = new PublicKey('4pzefKJgV5aSAhvzgv3Su7THyrxTkcUCU58fmXNHxh9Z')
export const getCurrentExchangeProgram = (): Exchange => {
  return _exchange
}
export const getExchangeProgram = async (): Promise<Exchange> => {
  if (_exchange) {
    return _exchange
  }
  _exchange = await Exchange.build(
    getSolanaConnection(SolanaNetworks.DEV),
    Network.LOCAL,
    getSolanaWallet(),
    getManagerProgram(),
    // new PublicKey('4MbnceNy8kjVFGYTaSLvk5vn4gLR9h3oNzgXByZcnVRe'),
    new PublicKey('Bn5Pi8MmJhe99XAVA5rCDCYYhb4RvrdrtejFQce5uEtF'),
    exchangeProgramId
  )
  return _exchange
}
export const connectExchangeWallet = async (): Promise<Exchange> => {
  _exchange = await Exchange.build(
    getSolanaConnection(SolanaNetworks.DEV),
    Network.LOCAL,
    getSolanaWallet(),
    getManagerProgram(),
    // new PublicKey('4MbnceNy8kjVFGYTaSLvk5vn4gLR9h3oNzgXByZcnVRe'),
    new PublicKey('Bn5Pi8MmJhe99XAVA5rCDCYYhb4RvrdrtejFQce5uEtF'),
    exchangeProgramId
  )
  return _exchange
}
