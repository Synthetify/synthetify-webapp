import { IStats, statsSliceName } from '@reducers/stats'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[statsSliceName] as IStats

export const { linePlot, last24, tvl } = keySelectors(store, ['linePlot', 'last24', 'tvl'])

export const statsSelector = {
  linePlot,
  last24,
  tvl
}

export default statsSelector
