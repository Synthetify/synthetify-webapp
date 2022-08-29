import { IUIStore, uiSliceName } from '@reducers/ui'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[uiSliceName] as IUIStore

export const { loader, welcomeModal } = keySelectors(store, ['loader', 'welcomeModal'])

export const navigationSelectors = { loader, welcomeModal }

export default navigationSelectors
