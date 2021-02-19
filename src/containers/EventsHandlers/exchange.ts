import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAccountAddress, assets } from '@selectors/exchange'
import { status } from '@selectors/solanaConnection'
import { actions } from '@reducers/exchange'
import { getSystemProgram, getOracleProgram } from '@web3/connection'
import { Status } from '@reducers/solanaConnection'
import { DEFAULT_PUBLICKEY } from '@consts/static'

const ExhcangeEvents = () => {
  const dispatch = useDispatch()
  const networkStatus = useSelector(status)
  const userAccount = useSelector(userAccountAddress)
  const allAssets = useSelector(assets)
  const exchangeProgram = getSystemProgram()
  React.useEffect(() => {
    if (
      userAccount.equals(DEFAULT_PUBLICKEY) ||
      !exchangeProgram ||
      networkStatus !== Status.Initalized
    ) {
      return
    }
    const connectEvents = () => {
      exchangeProgram.account.userAccount.subscribe(userAccount, 'singleGossip').on('change', a => {
        dispatch(actions.setUserAccountData({ shares: a.shares, collateral: a.collateral }))
      })
    }
    connectEvents()
  }, [dispatch, userAccount.toString(), networkStatus])

  React.useEffect(() => {
    if (!exchangeProgram || networkStatus !== Status.Initalized) {
      return
    }
    const connectEvents = () => {
      // @ts-expect-error
      exchangeProgram.state.subscribe('singleGossip').on('change', state => {
        console.log(state)
        dispatch(
          actions.setState({
            debt: state.debt,
            shares: state.shares,
            collateralAccount: state.collateralAccount,
            assets: state.assets.reduce((acc: any, a: any) => {
              return Object.assign(acc, {
                [a.assetAddress.toString()]: {
                  address: a.assetAddress,
                  feedAddress: a.feedAddress,
                  decimals: a.decimals,
                  price: a.price,
                  supply: a.supply,
                  ticker: a.ticker.toString()
                }
              })
            }, {}),
            collateralToken: state.collateralToken,
            mintAuthority: state.mintAuthority,
            fee: state.fee,
            collateralizationLevel: state.collateralizationLevel
          })
        )
        // dispatch(actions.setUserAccountData({ shares: a.shares, collateral: a.collateral }))
      })
    }
    connectEvents()
  }, [dispatch, exchangeProgram.programId.toString(), networkStatus])

  React.useEffect(() => {
    const oracleProgram = getOracleProgram()

    if (
      Object.values(allAssets).length === 0 ||
      !oracleProgram ||
      networkStatus !== Status.Initalized
    ) {
      return
    }
    const connectEvents = () => {
      for (const asset of Object.values(allAssets)) {
        oracleProgram.account.priceFeed
          .subscribe(asset.feedAddress, 'singleGossip')
          .on('change', a => {
            console.log(a.price.toString())
            dispatch(actions.setAssetPrice({ token: asset.address, price: a.price }))
          })
      }
    }
    connectEvents()
  }, [dispatch, Object.values(allAssets).length, networkStatus])

  return null
}

export default ExhcangeEvents
