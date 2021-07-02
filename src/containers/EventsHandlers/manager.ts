import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { state } from '@selectors/exchange'
import { status } from '@selectors/solanaConnection'
import { actions } from '@reducers/exchange'
import { Status } from '@reducers/solanaConnection'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { getManagerProgram } from '@web3/programs/manager'

const ManagerEvents = () => {
  const dispatch = useDispatch()
  const networkStatus = useSelector(status)
  const exchangeState = useSelector(state)
  const managerProgram = getManagerProgram()
  React.useEffect(() => {
    if (
      !managerProgram ||
      networkStatus !== Status.Initalized ||
      exchangeState.assetsList.equals(DEFAULT_PUBLICKEY)
    ) {
      return
    }
    const connectEvents = () => {
      managerProgram.onAssetsListChange(exchangeState.assetsList, assets => {
        // const parsedData = parseTokenAccountData(accountInfo.data)
        dispatch(actions.mergeAssets(assets.assets))
      })
    }
    connectEvents()
  }, [dispatch, exchangeState.assetsList.toString(), networkStatus])

  return null
}

export default ManagerEvents
