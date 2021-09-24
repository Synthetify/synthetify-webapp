import { IStats, action } from '@reducers/stats'
import { call, put, all, spawn, takeEvery, select } from 'typed-redux-saga'
import { network } from '@selectors/solanaConnection'
import axios from 'axios'

export function* getCurrentNetwork() {
  const currentNetwork = yield* select(network)
  return currentNetwork.toLowerCase()
}
const getData = async (name: string) => {
  return await axios.get(`https://api.synthetify.io/stats/${name}`)
}

export function* fetchData() {
  const dataTmp: IStats = {
    value: [],
    last24: { volume: 0, collateral: 0, mint: 0, debt: 0, fee: 0 }
  }
  try {
    const currentNetwork = yield* call(getCurrentNetwork)
    const response = yield* call(getData, currentNetwork)
    const elements = ['volume', 'mint', 'burn', 'liquidation', 'userCount']
    elements.forEach(element => {
      fillData(response.data, element, dataTmp)
    })
    dataTmp.last24.volume = response.data[response.data.length - 1].volume
    dataTmp.last24.collateral = response.data[response.data.length - 1].collateral
    dataTmp.last24.mint = response.data[response.data.length - 1].mint
    dataTmp.last24.debt = response.data[response.data.length - 1].debt
    dataTmp.last24.fee = response.data[response.data.length - 1].fee

    return dataTmp
  } catch (error) {
    console.log(error)
  }
}
export function fillData(value: any[], name: string, dataTmp: IStats) {
  const tmp: { id: string; points: Array<{ x: number; y: number }> } = {
    id: '',
    points: []
  }
  tmp.id = name
  for (let i = 0; i < value.length; i++) {
    tmp.points.push({ x: value[i].timestamp * 1000, y: value[i][name] })
    if (i === value.length - 1) {
      dataTmp.value.push(tmp)
    }
  }
  return dataTmp
}
export function* apiData(): Generator {
  try {
    const tmp = yield* call(fetchData)
    yield put(action.receiveApiData(tmp as IStats))
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
