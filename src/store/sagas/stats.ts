import { IStats, action } from '@reducers/stats'
import { call, put, all, spawn, takeEvery, select } from 'typed-redux-saga'
import { network } from '@selectors/solanaConnection'
import axios from 'axios'

const getData = async (name: string) => {
  return await axios.get(`https://api.synthetify.io/stats/${name}`)
}
export function fillData(value: any[]) {
  const elements = ['volume', 'mint', 'burn', 'liquidation', 'userCount']
  const linePlotArray = elements.map(element => {
    const tmp: { id: string; points: Array<{ x: number; y: number }> } = {
      id: element,
      points: []
    }
    for (let i = 0; i < value.length; i++) {
      if (element === 'userCount') {
        tmp.points.push({ x: value[i].timestamp * 1000, y: value[i][element].toFixed(0) })
      } else {
        tmp.points.push({ x: value[i].timestamp * 1000, y: value[i][element].toFixed(2) })
      }
    }
    return tmp
  })
  return linePlotArray
}

export function* apiData(): Generator {
  const dataTmp: IStats = {
    linePlot: [],
    last24: { volume: 0, collateral: 0, mint: 0, debt: 0, fee: 0 }
  }
  try {
    const currentNetwork = yield* select(network)
    const response = yield* call(getData, currentNetwork.toLowerCase())
    dataTmp.linePlot = fillData(response.data)

    dataTmp.last24.volume = response.data[response.data.length - 1].volume
    dataTmp.last24.collateral = response.data[response.data.length - 1].collateral
    dataTmp.last24.mint = response.data[response.data.length - 1].mint
    dataTmp.last24.debt = response.data[response.data.length - 1].debt
    dataTmp.last24.fee = response.data[response.data.length - 1].fee
    yield put(action.receiveApiData(dataTmp))
  } catch (error) {
    console.log(error)
  }
}

export function* getUpdateData(): Generator {
  yield takeEvery(action.updateData, apiData)
}

export function* statsSaga(): Generator {
  yield all([getUpdateData].map(spawn))
}
