import { IStats, statsSliceName } from '@reducers/stats'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[statsSliceName] as IStats

export const { value, last24 } = keySelectors(store, ['value', 'last24'])

export const statsSelector = {
  value,
  last24
}

export default statsSelector
