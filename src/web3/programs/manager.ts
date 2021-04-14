import { Manager, Network } from '@synthetify/sdk'
import { getSolanaConnection } from '@web3/connection'
import { SolanaNetworks } from '@consts/static'
import { getSolanaWallet } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'
let _manager: Manager
const managerProgramId: PublicKey = new PublicKey('gFWoDFoBtPc7kzTsEuEPkYBVG6dFDqNNvBL6iRKkbeZ')

export const getManagerProgram = () => {
  if (_manager) {
    return _manager
  }
  _manager = new Manager(
    getSolanaConnection(SolanaNetworks.DEV),
    Network.LOCAL,
    getSolanaWallet(),
    managerProgramId
  )
  return _manager
}
