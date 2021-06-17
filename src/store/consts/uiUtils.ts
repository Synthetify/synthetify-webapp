import { PublicKey } from '@solana/web3.js'

export const toBlur = 'global-blur'
export const blurContent = () => {
  const el = document.getElementById(toBlur)
  if (!el) return
  el.style.filter = 'blur(4px) brightness(0.4)'
}
export const unblurContent = () => {
  const el = document.getElementById(toBlur)
  if (!el) return
  el.style.filter = 'none'
}

export const shortenAdress = (publicKey: PublicKey): string => {
  let result = ''
  const address = publicKey.toString()
  alert(address)

  for (let i = 0; i < 4; i++) result += address[i]
  result += '...'
  for (let i = 4; i > 0; i--) result += address[address.length - i]
  return result
}
