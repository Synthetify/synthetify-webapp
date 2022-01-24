import {
  calculateAmountBorrow,
  calculateAmountCollateral,
  calculateAvailableBorrow,
  calculateAvailableBorrowAndWithdraw,
  calculateAvailableWithdraw,
  calculateCRatio,
  calculateLiqAndCRatio,
  calculateLiqPrice,
  changeInputCollateral,
  changeInputSynthetic
} from '../store/consts/borrowUtils'
import { BN } from '@project-serum/anchor'
describe('calculateAmountBorrow', () => {
  test('test', () => {
    const result = calculateAmountBorrow(
      new BN(2000000),
      6,
      new BN(1000000),
      6,
      new BN(10000000),
      '100.00'
    )
    expect(result.toString()).toBe('5000000')
  })
})

describe('calculateAmountCollateral', () => {
  test('test', () => {
    const result = calculateAmountCollateral(
      {
        priceVal: new BN(1000000),
        assetScale: 6,
        symbol: 'SNY',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      {
        priceVal: new BN(2000000),
        assetScale: 6,
        symbol: 'xUSD',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      new BN(1000000),
      '100.00'
    )
    expect(result.toString()).toBe('500000')
  })
})

describe('calculateCRatio', () => {
  test('test', () => {
    const result = calculateCRatio(
      new BN(7000000),
      6,
      new BN(200000),
      6,
      new BN(1000000),
      new BN(1000000)
    )
    expect(result.toString()).toBe('285')
  })
})

describe('calculateLiqPrice', () => {
  test('test', () => {
    const result = calculateLiqPrice(
      new BN(17000000),
      new BN(1000000),
      new BN(20000000),
      new BN(1000000),
      { val: new BN(40000), scale: 6 },
      6,
      6
    )
    expect(result.toString()).toBe('5')
  })
})

describe('calculateAvailableBorrow', () => {
  test('test', () => {
    const result = calculateAvailableBorrow(
      {
        priceVal: new BN(3500000),
        assetScale: 6,
        symbol: 'SNY',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      {
        priceVal: new BN(1000000),
        assetScale: 6,
        symbol: 'xUSD',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      '200',
      new BN(1500000),
      new BN(2050000),
      new BN(2000000),
      '200',
      '1'
    )
    expect(result.toString()).toBe('289957')
  })
})

describe('calculateAvailableWithdraw', () => {
  test('test', () => {
    const result = calculateAvailableWithdraw(
      {
        priceVal: new BN(1000000),
        assetScale: 6,
        symbol: 'xUSD',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      {
        priceVal: new BN(3500000),
        assetScale: 6,
        symbol: 'SNY',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      '200',
      new BN(5500000),
      new BN(100000),
      new BN(2000000)
    )
    expect(result.toString()).toBe('4414286')
  })
})

describe('calculateLiqAndCRatio', () => {
  test('test', () => {
    const result = calculateLiqAndCRatio(
      'borrow',
      new BN(3500000),
      new BN(1000000),
      new BN(2000000),
      new BN(1000000),
      new BN(1560000),
      new BN(1000000),
      { val: new BN(5000), scale: 5 },
      6,
      6,
      new BN(10000)
    )
    expect(result.cRatioTo.toString()).toBe('386')
    expect(result.cRatioFrom.toString()).toBe('700')
  })
})

describe('calculateAvailableBorrowAndWithdraw', () => {
  test('test', () => {
    const result = calculateAvailableBorrowAndWithdraw(
      {
        priceVal: new BN(1000000),
        assetScale: 6,
        symbol: 'xUSD',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      {
        priceVal: new BN(3500000),
        assetScale: 6,
        symbol: 'SNY',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      '200',
      new BN(5000000),
      new BN(100000),
      new BN(2000000),
      new BN(2000000),
      '200',
      '1'
    )
    expect(result.availableBorrow.toString()).toBe('6856435')
    expect(result.availableWithdraw.toString()).toBe('5000000')
  })
})

describe('changeInputSynthetic', () => {
  test('test', () => {
    const result = changeInputSynthetic(
      '555',
      {
        priceVal: new BN(1000000),
        assetScale: 6,
        symbol: 'xUSD',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      {
        priceVal: new BN(3000000),
        assetScale: 6,
        symbol: 'SNY',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      '200'
    )
    expect(result.amountCollBN.toString()).toBe('370000000')
  })
})

describe('changeInputCollateral', () => {
  test('test', () => {
    const result = changeInputCollateral(
      '555',
      {
        priceVal: new BN(1000000),
        assetScale: 6,
        symbol: 'xUSD',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      {
        priceVal: new BN(3000000),
        assetScale: 6,
        symbol: 'SNY',
        maxAvailable: new BN(100000000),
        balance: new BN(10000000)
      },
      '200',
      '1'
    )
    expect(result.amountBorBN.toString()).toBe('824257425')
  })
})
