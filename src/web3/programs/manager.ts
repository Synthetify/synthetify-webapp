import { Manager, Network } from '@synthetify/sdk'
import {
  getSolanaConnection,
  getSolanaNetwork,
  solanaNetworktoProgramNetwork
} from '@web3/connection'
import { SolanaNetworks } from '@consts/static'
import { getSolanaWallet } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'
let _manager: Manager
const managerProgramId: PublicKey = new PublicKey('8tz9z3uGwmC62E3Uarp9zUJkR8tjzbnk9gyAhys7hzoz')

export const getManagerProgram = () => {
  if (_manager) {
    return _manager
  }
  const solanaNetwork = getSolanaNetwork()
  const net = solanaNetworktoProgramNetwork(solanaNetwork)
  _manager = new Manager(
    getSolanaConnection(solanaNetwork),
    net,
    getSolanaWallet(),
    managerProgramId
  )
  return _manager
}
