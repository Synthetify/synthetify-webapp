import { PublicKey } from '@solana/web3.js'
import { UserStaking } from '@reducers/exchange'
import { BN } from '@project-serum/anchor'

export const constValue: string = 'constValue'

declare global {
  interface Window {
    solana: any
  }
  interface ImportMeta {
    globEager: (x: string) => { [propertyName: string]: { default: string } }
  }
}

enum SolanaNetworks {
  DEV = 'https://api.devnet.solana.com',
  TEST = 'https://api.testnet.solana.com',
  MAIN = 'https://api.mainnet-beta.solana.com',
  LOCAL = 'http://127.0.0.1:8899'
}
const DEFAULT_PUBLICKEY = new PublicKey(0)
const ORACLE_OFFSET = 6
const ACCURACY = 6
const DEFAULT_STAKING_DATA: UserStaking = {
  amountToClaim: new BN(0),
  currentRoundPoints: new BN(0),
  finishedRoundPoints: new BN(0),
  nextRoundPoints: new BN(0),
  lastUpdate: new BN(0)
}
export { SolanaNetworks, DEFAULT_PUBLICKEY, ORACLE_OFFSET, ACCURACY, DEFAULT_STAKING_DATA }
