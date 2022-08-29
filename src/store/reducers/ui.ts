import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
export interface Loader {
  open: boolean
  message?: string
}
export interface IUIStore {
  loader: Loader
  welcomeModal: boolean
}

export const defaultState: IUIStore = {
  loader: { open: true, message: '' },
  welcomeModal: true
}
export const uiSliceName = 'ui'
const uiSlice = createSlice({
  name: uiSliceName,
  initialState: defaultState,
  reducers: {
    setLoader(state, action: PayloadAction<Loader>) {
      state.loader = action.payload
      return state
    },
    setWelcomeModal(state, action: PayloadAction<boolean>) {
      state.welcomeModal = action.payload
      return state
    }
  }
})

export const actions = uiSlice.actions
export const reducer = uiSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
