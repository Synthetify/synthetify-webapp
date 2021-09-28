import { IStats, statsSliceName } from '@reducers/stats'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[statsSliceName] as IStats

export const { linePlot, last24 } = keySelectors(store, ['linePlot', 'last24'])

export const statsSelector = {
  linePlot,
  last24
}

export default statsSelector
