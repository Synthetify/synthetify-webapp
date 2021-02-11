import { IUIStore, uiSliceName } from '@reducers/ui'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[uiSliceName] as IUIStore

export const { loader } = keySelectors(store, ['loader'])

export const navigationSelectors = { loader }

export default navigationSelectors
