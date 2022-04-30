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
  // DEV = 'https://solana--devnet.datahub.figment.io/apikey/52c60049a8f23b7ca8cc9633c1170036',
  DEV = 'https://api.devnet.solana.com/',
  TEST = 'https://api.testnet.solana.com',
  // MAIN = 'https://api.mainnet-beta.solana.com',
  MAIN = 'https://solana--mainnet.datahub.figment.io/apikey/52c60049a8f23b7ca8cc9633c1170036',
  MAIN_SERUM = 'https://ssc-dao.genesysgo.net',
  LOCAL = 'http://127.0.0.1:8899'
}
enum NetworkType {
  DEVNET = 'Devnet',
  TESTNET = 'Testnet',
  LOCALNET = 'Localnet',
  MAINNET = 'Mainnet'
}
const MAINNET_RPCS = [
  // when adding new rpc: 1) make sure probability is between 0 and one; 2) sum od all probabilities is equal to 1
  // {
  //   rpc: SolanaNetworks.MAIN,
  //   probability: 0.6
  // },
  {
    rpc: SolanaNetworks.MAIN_SERUM,
    // rpc: SolanaNetworks.MAIN,
    probability: 1
  }
]
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

const descrpitionForSymbol: { [key: string]: string } = {
  SNY: 'Synthetify',
  xBNB: 'Synthetic Binance Coin',
  xBTC: 'Synthetic Bitcoin',
  xETH: 'Synthetic Ethereum',
  xFTT: 'Synthetic FTT',
  xSOL: 'Synthetic Solana',
  xSRM: 'Synthetic Serum',
  xUSD: 'Synthetic USD',
  stSOL: 'Staked Solana',
  WSOL: 'Wrapped Solana',
  USDC: 'USD Coin',
  renBTC: 'renBTC',
  whETH: 'Wormhole ETH',
  whFTT: 'Wormhole FTT',
  mSOL: 'Marinade SOL',
  xLUNA: 'Synthetic LUNA',
  xAVAX: 'Synthetic Avalanche',
  xDOT: 'Synthetic Polkadot',
  xDOGE: 'Synthetic Dogecoin',
  xGOLD: 'Synthetic Gold'
}

const AVERAGE_MNDE_APY = 28.24

const MARINADE_PER_POINT = 6.62e-7

const MNDE_WEEK_AMOUNT = 19231

export {
  SolanaNetworks,
  DEFAULT_PUBLICKEY,
  ORACLE_OFFSET,
  ACCURACY,
  DEFAULT_STAKING_DATA,
  MAX_U64,
  MAINNET_RPCS,
  NetworkType,
  descrpitionForSymbol,
  MARINADE_PER_POINT,
  MNDE_WEEK_AMOUNT
}
