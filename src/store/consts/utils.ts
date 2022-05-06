/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { RoundData } from '@components/WrappedActionMenu/RewardsTab/RewardsTab'
import { BN } from '@project-serum/anchor'
import { ICollateral, ISynthetic } from '@reducers/exchange'
import { u64 } from '@solana/spl-token'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import * as R from 'remeda'
export const tou64 = (amount: BN | String) => {
  // eslint-disable-next-line new-cap
  // @ts-expect-error
  // eslint-disable-next-line new-cap
  return new u64(amount.toString()) // this works but ts has some problem with using u64 constructor
}
export const transformBN = (amount: BN): string => {
  // eslint-disable-next-line new-cap
  return (amount.div(new BN(1e2)).toNumber() / 1e4).toString()
}
export const printBN = (amount: BN, decimals: number): string => {
  const balanceString = amount.toString()
  if (balanceString.length <= decimals) {
    return '0.' + '0'.repeat(decimals - balanceString.length) + balanceString
  } else {
    return trimZeros(
      balanceString.substring(0, balanceString.length - decimals) +
        '.' +
        balanceString.substring(balanceString.length - decimals)
    )
  }
}
export const printDecimal = (amount: Decimal): string => printBN(amount.val, amount.scale)
// Bad solution but i hate regex
export const trimZeros = (amount: string) => {
  try {
    return parseFloat(amount).toString()
  } catch (error) {
    return amount
  }
}
export const printBNtoBN = (amount: string, decimals: number): BN => {
  const balanceString = amount.split('.')
  if (balanceString.length !== 2) {
    return new BN(balanceString[0] + '0'.repeat(decimals))
  }
  // console.log(balanceString[1].length)
  if (balanceString[1].length <= decimals) {
    return new BN(
      balanceString[0] + balanceString[1] + '0'.repeat(decimals - balanceString[1].length)
    )
  }
  return new BN(0)
}
export interface ParsedBN {
  BN: BN
  decimal: number
}
export const stringToMinDecimalBN = (value: string): ParsedBN => {
  if (value.includes('.')) {
    const [before, after] = value.split('.')
    return {
      BN: new BN(`${before}${after}`),
      decimal: after.length || 0
    }
  }
  return {
    BN: new BN(value),
    decimal: 0
  }
}
export const capitalizeString = (str: string) => {
  if (!str) {
    return str
  }
  return str[0].toUpperCase() + str.substr(1).toLowerCase()
}

export const divUp = (a: BN, b: BN): BN => {
  return a.add(b.subn(1)).div(b)
}
export const divUpNumber = (a: number, b: number): number => {
  return Math.ceil(a / b)
}
export const removeTickerPrefix = (ticker: string, prefix: string[] = ['x', '$']): string => {
  const index = prefix.findIndex(p => ticker.startsWith(p))
  if (index && prefix[index]) {
    return ticker.substring(prefix[index].length)
  }
  return ticker
}
const zeroPad = (num: string, places: number) => num.padStart(places, '0')
const displayTwoFixed = (num: number): string => {
  return zeroPad(num.toFixed(0), 2)
}
export const displayDate = (seconds: number) => {
  return `
  ${displayTwoFixed(seconds / 3600)}:${displayTwoFixed((seconds / 60) % 60)}:${displayTwoFixed(
    seconds % 60
  )}`
}

export const discountData = (userCollateralBalance: BN) => {
  // decimals of token = 6
  const ONE_SNY = new BN(1000000)
  const thresholds = [
    100, 200, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2000000,
    5000000
  ]

  for (let val = 0; val < 16; val++) {
    if (userCollateralBalance.lt(ONE_SNY.mul(new BN(thresholds[val])))) {
      return {
        discount: -val,
        nextThreshold: thresholds[val]
      }
    }
  }
  return {
    discount: 15,
    nextThreshold: undefined
  }
}

export const showPrefix = (nr: number) => {
  if (nr >= 10000) {
    if (nr >= 1000000) {
      if (nr >= 1000000000) {
        return 'B'
      } else {
        return 'M'
      }
    } else {
      return 'K'
    }
  } else {
    return ''
  }
}

export const formatNumbers = (value: string) => {
  const num = Number(value)

  if (num < 10) {
    return num.toFixed(4)
  }

  if (num < 1000) {
    return num.toFixed(2)
  }

  if (num < 10000) {
    return num.toFixed(1)
  }

  if (num < 1000000) {
    return (num / 1000).toFixed(2)
  }
  if (num < 1000000000) {
    return (num / 1000000).toFixed(2)
  }

  return (num / 1000000000).toFixed(2)
}

export const formatNumbersBorrowTable = (value: string) => {
  const num = Number(value)
  if (num < 0) {
    return num.toFixed(3)
  }
  if (num < 1000) {
    return num.toFixed(2)
  }
  if (num < 10000) {
    return num.toFixed(1)
  }
  if (num < 1000000) {
    return (num / 1000).toFixed(0)
  }

  return (num / 1000000).toFixed(0)
}

export const estimateRounds = (rewards: {
  slot: number
  amountToClaim: Decimal
  rounds: RoundData
  roundLength: number
  userDebtShares: BN
}): RoundData => {
  const { userDebtShares, roundLength, rounds, slot } = rewards
  const { current, next } = rounds

  if (next.roundStartSlot.toNumber() >= slot) {
    return rounds
  }
  const slotDiff = slot - next.roundStartSlot.toNumber()
  const roundDiff = divUpNumber(slotDiff, roundLength)

  switch (roundDiff) {
    case 1: {
      return {
        finished: current,
        current: next,
        next: {
          roundStartSlot: next.roundStartSlot.add(new BN(roundLength)),
          roundAllPoints: next.roundAllPoints,
          roundPoints: userDebtShares,
          roundAmount: next.roundAmount
        }
      }
    }
    case 2: {
      return {
        finished: next,
        current: {
          roundStartSlot: next.roundStartSlot.add(new BN(roundLength)),
          roundAllPoints: next.roundAllPoints,
          roundPoints: userDebtShares,
          roundAmount: next.roundAmount
        },
        next: {
          roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(2))),
          roundAllPoints: next.roundAllPoints,
          roundPoints: userDebtShares,
          roundAmount: next.roundAmount
        }
      }
    }
    default: {
      return {
        finished: {
          roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(roundDiff - 2))),
          roundAllPoints: next.roundAllPoints,
          roundPoints: userDebtShares,
          roundAmount: next.roundAmount
        },
        current: {
          roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(roundDiff - 1))),
          roundAllPoints: next.roundAllPoints,
          roundPoints: userDebtShares,
          roundAmount: next.roundAmount
        },
        next: {
          roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(roundDiff))),
          roundAllPoints: next.roundAllPoints,
          roundPoints: userDebtShares,
          roundAmount: next.roundAmount
        }
      }
    }
  }
}

export const calculateTimeRemaining = (slot: number, nextRoundStartSlot: BN): BN => {
  const slotTime = 0.5
  const slotDiff = nextRoundStartSlot.sub(new BN(slot))
  if (slotDiff.lten(0)) {
    return new BN(1)
  }
  return slotDiff.muln(slotTime)
}
export const getSyntheticAndCollateralAdresses = (
  synthetics: { [x: string]: ISynthetic },
  collateral: { [x: string]: ICollateral },
  nr: number
) => {
  let syntheticAddress: string = ''
  R.forEachObj(synthetics, element => {
    if (element.assetIndex === nr) {
      syntheticAddress = element.assetAddress.toString()
    }
  })

  let collateralAddress: string = ''
  R.forEachObj(collateral, element => {
    if (element.assetIndex === nr && element.symbol !== 'XYZ') {
      collateralAddress = element.collateralAddress.toString()
    }
  })

  return [syntheticAddress, collateralAddress]
}

export const getMndePrice = async () => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=marinade'
  )

  if (!res.ok) {
    return 0
  }

  const mndeData: Array<{ current_price: number }> = await res.json()

  return mndeData[0].current_price
}
