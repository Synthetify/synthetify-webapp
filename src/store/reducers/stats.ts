import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
export interface Points {
  x: number
  y: number
}
export interface Data {
  id: string
  points: Points[]
}
export interface CardData {
  volume: number
  collateral: number
  mint: number
  debt: number
  fee: number
}
export interface IStats {
  linePlot: Data[]
  last24: CardData
}
const timestamp = Date.now()
export const defaultState: IStats = {
  linePlot: [
    {
      id: 'volume',
      points: [
        {
          x: timestamp,
          y: 10
        },
        {
          x: timestamp + 5,
          y: 15
        }
      ]
    },
    {
      id: 'liquidation',
      points: [
        {
          x: timestamp,
          y: 10
        },
        {
          x: timestamp + 5,
          y: 15
        }
      ]
    },
    {
      id: 'mint',
      points: [
        {
          x: timestamp,
          y: 10
        },
        {
          x: timestamp + 5,
          y: 15
        }
      ]
    },
    {
      id: 'burn',
      points: [
        {
          x: timestamp,
          y: 10
        },
        {
          x: timestamp + 5,
          y: 15
        }
      ]
    },
    {
      id: 'userCount',
      points: [
        {
          x: timestamp,
          y: 10
        },
        {
          x: timestamp + 5,
          y: 15
        }
      ]
    }
  ],
  last24: {
    volume: 0,
    collateral: 0,
    mint: 0,
    debt: 0,
    fee: 0
  }
}

export const statsSliceName = 'stats'
const statsSlice = createSlice({
  name: statsSliceName,
  initialState: defaultState,
  reducers: {
    receiveApiData(state, action: PayloadAction<IStats>) {
      state.linePlot = action.payload.linePlot
      state.last24 = action.payload.last24
    },
    updateData(state) {
      return state
    }
  }
})

export const action = statsSlice.actions
export const reducer = statsSlice.reducer
export type PayloadTypes = PayloadType<typeof action>
