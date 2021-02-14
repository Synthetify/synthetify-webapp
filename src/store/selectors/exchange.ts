import { IExchange, exchangeSliceName } from '../reducers/exchange'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[exchangeSliceName] as IExchange

export const {
  assets,
  collateralAccount,
  collateralToken,
  collateralizationLevel,
  debt,
  fee,
  shares
} = keySelectors(store, [
  'assets',
  'collateralAccount',
  'collateralToken',
  'collateralizationLevel',
  'debt',
  'fee',
  'shares'
])

export const exchangeSelectors = {
  assets,
  collateralAccount,
  collateralToken,
  collateralizationLevel,
  debt,
  fee,
  shares
}

export default exchangeSelectors
