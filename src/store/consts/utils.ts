import { BN } from '@project-serum/anchor'
import { u64 } from '@solana/spl-token'

export const tou64 = (amount: BN | String) => {
  // eslint-disable-next-line new-cap
  return new u64(amount.toString())
}
export const transformBN = (amount: BN): string => {
  // eslint-disable-next-line new-cap
  return (amount.div(new BN(1e4)).toNumber() / 1e4).toString()
}
