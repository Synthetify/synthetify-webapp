import { IStaking, stakingSliceName } from '@reducers/staking'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[stakingSliceName] as IStaking

export const { createAccount, send, deposit, mint, withdraw, burn } = keySelectors(store, [
  'createAccount',
  'send',
  'deposit',
  'mint',
  'withdraw',
  'burn'
])

export const stakingSelectors = {
  createAccount,
  send,
  deposit,
  mint,
  withdraw,
  burn
}

export default stakingSelectors
