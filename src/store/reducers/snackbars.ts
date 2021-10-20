import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { Color } from '@material-ui/lab/Alert'

export interface ISnackbar {
  message: string
  key?: string
  variant: Color
  open: boolean
  action?: (key: number) => JSX.Element
  persist?: boolean,
  txid?: string
  isAccount?: boolean
}

export interface ISnackbarStore {
  snackbars: ISnackbar[]
}

const defaultStatus: ISnackbarStore = {
  snackbars: []
}
export const snackbarsSliceName = 'snackbars'
const snackbarsSlice = createSlice({
  name: snackbarsSliceName,
  initialState: defaultStatus,
  reducers: {
    add(state, action: PayloadAction<Omit<ISnackbar, 'open'>>) {
      state.snackbars.push({
        key: (new Date().getMilliseconds() + Math.random()).toString(),
        ...action.payload,
        open: true
      })
      return state
    },
    hide(state, action: PayloadAction<string>) {
      const index = state.snackbars.findIndex(snack => snack.key === action.payload)
      if (index === -1) {
        return state
      }
      state.snackbars[index].open = false
      return state
    },
    remove(state, action: PayloadAction<string>) {
      state.snackbars = state.snackbars.filter(snack => snack.key !== action.payload)
      return state
    }
  }
})

export const actions = snackbarsSlice.actions
export const reducer = snackbarsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
