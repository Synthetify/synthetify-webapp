import { Exchange } from '@synthetify/sdk'
import {
  getSolanaConnection,
  getSolanaNetwork,
  solanaNetworktoProgramNetwork
} from '@web3/connection'
import { getSolanaWallet } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'
let _exchange: Exchange
const exchangeProgramId: PublicKey = new PublicKey('4pzefKJgV5aSAhvzgv3Su7THyrxTkcUCU58fmXNHxh9Z')
export const getCurrentExchangeProgram = (): Exchange => {
  return _exchange
}
export const getExchangeProgram = async (): Promise<Exchange> => {
  if (_exchange) {
    return _exchange
  }
  const solanaNetwork = getSolanaNetwork()
  const net = solanaNetworktoProgramNetwork(solanaNetwork)
  _exchange = await Exchange.build(
    getSolanaConnection(solanaNetwork),
    net,
    getSolanaWallet(),
    // new PublicKey('4MbnceNy8kjVFGYTaSLvk5vn4gLR9h3oNzgXByZcnVRe'),
    new PublicKey('Bn5Pi8MmJhe99XAVA5rCDCYYhb4RvrdrtejFQce5uEtF'),
    exchangeProgramId
  )
  await _exchange.getState()
  return _exchange
}
export const connectExchangeWallet = async (): Promise<Exchange> => {
  const solanaNetwork = getSolanaNetwork()
  const net = solanaNetworktoProgramNetwork(solanaNetwork)
  _exchange = await Exchange.build(
    getSolanaConnection(solanaNetwork),
    net,
    getSolanaWallet(),
    // new PublicKey('4MbnceNy8kjVFGYTaSLvk5vn4gLR9h3oNzgXByZcnVRe'),
    new PublicKey('Bn5Pi8MmJhe99XAVA5rCDCYYhb4RvrdrtejFQce5uEtF'),
    exchangeProgramId
  )
  await _exchange.getState()
  return _exchange
}
