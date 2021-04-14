import { Exchange, Network } from '@synthetify/sdk'
import { getSolanaConnection } from '@web3/connection'
import { SolanaNetworks } from '@consts/static'
import { getSolanaWallet } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'
import { getManagerProgram } from './manager'
let _exchange: Exchange
const exchangeProgramId: PublicKey = new PublicKey('9jASgXRRxyn4U8fPgenQswNSR3dbafocepWJghcYhu3K')
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
    new PublicKey('14RV3Z6yQBAMRopbjxx2ke2cC1hiEyHUhmNymKbis3Xj'),
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
    new PublicKey('14RV3Z6yQBAMRopbjxx2ke2cC1hiEyHUhmNymKbis3Xj'),
    exchangeProgramId
  )
  return _exchange
}
