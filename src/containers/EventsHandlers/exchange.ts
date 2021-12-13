import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assets, exchangeAccount, state } from '@selectors/exchange'
import { network, status } from '@selectors/solanaConnection'
import { actions } from '@reducers/exchange'
import { actions as actionsVault } from '@reducers/vault'
import { Status } from '@reducers/solanaConnection'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { getCurrentExchangeProgram } from '@web3/programs/exchange'
import { getOracleProgram } from '@web3/programs/oracle'
import { getCurrentSolanaConnection, networkTypetoProgramNetwork } from '@web3/connection'
import { BN } from '@synthetify/sdk'
import { parsePriceData } from '@pythnetwork/client'
import { SWAPLINE_MAP } from '@synthetify/sdk/lib/utils'

import { VAULTS_MAP } from '@consts/consts'
import { address } from '@selectors/solanaWallet'
import { vaultSwap } from '@selectors/vault'
const ExhcangeEvents = () => {
  const dispatch = useDispatch()
  const networkStatus = useSelector(status)
  const networkType = useSelector(network)
  const exchangeState = useSelector(state)
  const userAccount = useSelector(exchangeAccount)
  const allAssets = useSelector(assets)
  const exchangeProgram = getCurrentExchangeProgram()
  const owner = useSelector(address)
  const vault = useSelector(vaultSwap)
  React.useEffect(() => {
    if (
      userAccount.address.equals(DEFAULT_PUBLICKEY) ||
      !exchangeProgram ||
      networkStatus !== Status.Initialized
    ) {
      return
    }
    const connectEvents = () => {
      exchangeProgram.onAccountChange(userAccount.address, a => {
        dispatch(
          actions.setExchangeAccount({
            address: userAccount.address,
            collaterals: a.collaterals.slice(0, a.head),
            debtShares: a.debtShares,
            userStaking: a.userStakingData
          })
        )
      })
    }
    connectEvents()
  }, [dispatch, userAccount.address.toString(), exchangeProgram, networkStatus])

  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (!exchangeProgram || networkStatus !== Status.Initialized || !connection) {
      return
    }
    const connectEvents = () => {
      exchangeProgram.onStateChange(state => {
        dispatch(actions.setState(state))
      })

      SWAPLINE_MAP[networkTypetoProgramNetwork(networkType)].map(async swapline => {
        const { swaplineAddress } = await exchangeProgram.getSwaplineAddress(
          swapline.synthetic,
          swapline.collateral
        )
        const data = await exchangeProgram.getSwapline(swaplineAddress)
        dispatch(
          actions.setSwapline({
            address: swaplineAddress,
            swapline: data
          })
        )
        connection.onAccountChange(swaplineAddress, () => {
          exchangeProgram.getSwapline(swaplineAddress).then(
            swaplineData => {
              dispatch(
                actions.setSwapline({
                  address: swaplineAddress,
                  swapline: swaplineData
                })
              )
            },
            () => {}
          )
        })
      })
    }
    connectEvents()
  }, [dispatch, exchangeProgram, networkStatus])

  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()

    if (!exchangeProgram || networkStatus !== Status.Initialized || !connection) {
      return
    }
    const connectEvents = async () => {
      exchangeProgram.onStateChange(state => {
        dispatch(actions.setState(state))
      })

      VAULTS_MAP[networkTypetoProgramNetwork(networkType)].map(async vault => {
        const { vaultAddress } = await exchangeProgram.getVaultAddress(
          vault.synthetic,
          vault.collateral
        )
        const data = await exchangeProgram.getVaultForPair(vault.synthetic, vault.collateral)
        dispatch(
          actionsVault.setVault({
            address: vaultAddress,
            vault: data
          })
        )
        const vaultEntryAmount = await exchangeProgram.getVaultEntryForOwner(
          vault.synthetic,
          vault.collateral,
          owner
        )
        dispatch(actionsVault.setOwnedVaults(vaultEntryAmount))
      })
    }

    connectEvents().catch(error => console.log(error))
  }, [dispatch, exchangeProgram, networkStatus, vault.loading])

  React.useEffect(() => {
    const oracleProgram = getOracleProgram()
    const connection = getCurrentSolanaConnection()

    if (
      allAssets.length === 0 ||
      !oracleProgram ||
      networkStatus !== Status.Initialized ||
      !connection
    ) {
      return
    }
    const connectEvents = () => {
      allAssets.forEach((asset, index) => {
        connection.onAccountChange(asset.feedAddress, accountInfo => {
          const data = parsePriceData(accountInfo.data)
          data.price &&
            dispatch(
              actions.setAssetPrice({
                tokenIndex: index,
                price: {
                  val: new BN(data.price * 10 ** asset.price.scale),
                  scale: asset.price.scale
                }
              })
            )
        })
      })
    }
    connectEvents()
  }, [dispatch, allAssets.length, networkStatus])

  React.useEffect(() => {
    if (
      !exchangeProgram ||
      networkStatus !== Status.Initialized ||
      exchangeState.assetsList.equals(DEFAULT_PUBLICKEY)
    ) {
      return
    }
    const connectEvents = () => {
      exchangeProgram.onAssetsListChange(exchangeState.assetsList, assets => {
        // const parsedData = parseTokenAccountData(accountInfo.data)
        dispatch(actions.mergeAssets(assets.assets.slice(0, assets.headAssets)))
        dispatch(actions.mergeSynthetics(assets.synthetics.slice(0, assets.headSynthetics)))
        dispatch(actions.mergeCollaterals(assets.collaterals.slice(0, assets.headCollaterals)))
      })
    }
    connectEvents()
  }, [dispatch, exchangeState.assetsList.toString(), networkStatus])

  return null
}

export default ExhcangeEvents
