import { PublicKey } from '@solana/web3.js'

export const constValue: string = 'constValue'

declare global {
  interface Window {
    ethereum: any
    solana: any
  }
}
window.ethereum = window.ethereum || {}
window.solana = window.solana || {}

enum SolanaNetworks {
  DEV = 'https://api.devnet.solana.com',
  TEST = 'https://api.testnet.solana.com',
  MAIN = 'https://api.mainnet-beta.solana.com',
  LOCAL = 'http://127.0.0.1:8899'
}
const DEFAULT_PUBLICKEY = new PublicKey(0)
const ORACLE_OFFSET = 6
const ACCURACY = 6
export { SolanaNetworks, DEFAULT_PUBLICKEY, ORACLE_OFFSET, ACCURACY }
