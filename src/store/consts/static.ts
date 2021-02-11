export const constValue: string = 'constValue'

declare global {
  interface Window {
    ethereum: any
  }
}
window.ethereum = window.ethereum || {}
