export const constValue: string = 'constValue'

declare global {
  interface Window {
    ethereum: any
  }
}
window.ethereum = window.ethereum || {}

enum SolanaNetworks {
  DEV = 'http://devnet.solana.com',
  TEST = 'http://testnet.solana.com',
  MAIN = 'http://api.mainnet-beta.solana.com'
}

export { SolanaNetworks }
