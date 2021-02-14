export const constValue: string = 'constValue'

declare global {
  interface Window {
    ethereum: any
  }
}
window.ethereum = window.ethereum || {}

enum SolanaNetworks {
  DEV = 'https://devnet.solana.com',
  TEST = 'https://testnet.solana.com',
  MAIN = 'https://api.mainnet-beta.solana.com'
}

export { SolanaNetworks }
