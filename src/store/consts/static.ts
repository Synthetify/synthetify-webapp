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

export const SNY_DEV_TOKEN = '9dLGczoMUANNef7Je5qpSYjBxyT8PTh5tEZqo3pJktM9'

enum SolanaNetworks {
  DEV = 'https://api.devnet.solana.com',
  TEST = 'https://api.testnet.solana.com',
  MAIN = 'https://api.mainnet-beta.solana.com',
  LOCAL = 'http://127.0.0.1:8899'
}
const DEFAULT_PUBLICKEY = new PublicKey(0)
const ORACLE_OFFSET = 8
const ACCURACY = 6
const DEFAULT_STAKING_DATA: UserStaking = {
  amountToClaim: {
    val: new BN(0),
    scale: 0
  },
  currentRoundPoints: new BN(0),
  finishedRoundPoints: new BN(0),
  nextRoundPoints: new BN(0),
  lastUpdate: new BN(0)
}
const MAX_U64 = new BN('18446744073709551615')
export { SolanaNetworks, DEFAULT_PUBLICKEY, ORACLE_OFFSET, ACCURACY, DEFAULT_STAKING_DATA, MAX_U64 }
