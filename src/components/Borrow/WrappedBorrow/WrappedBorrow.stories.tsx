import React from 'react'
import { storiesOf } from '@storybook/react'
import { BorrowedPair, WrappedBorrow } from './WrappedBorrow'
import { BN } from '@project-serum/anchor'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { Asset, Collateral, PriceStatus, Synthetic } from '@synthetify/sdk/lib/exchange'
import { Grid } from '@material-ui/core'
import { UserVaults } from '@selectors/exchange'

storiesOf('borrow/wrappedborrow', module).add('default', () =>
  React.createElement(() => {
    const defaultSynthetic: Synthetic = {
      assetIndex: 0,
      assetAddress: new PublicKey(0),
      supply: {
        val: new BN(1e6),
        scale: 6
      },
      maxSupply: {
        val: new BN(1e10),
        scale: 6
      },
      settlementSlot: new BN(1),
      borrowedSupply: {
        val: new BN(1e6),
        scale: 6
      },
      swaplineSupply: {
        val: new BN(1e6),
        scale: 6
      }
    }

    const defaultCollateral: Collateral = {
      assetIndex: 0,
      collateralAddress: new PublicKey(0),
      reserveAddress: new PublicKey(0),
      liquidationFund: new PublicKey(0),
      reserveBalance: {
        val: new BN(1e6),
        scale: 6
      },
      collateralRatio: {
        val: new BN(30000),
        scale: 6
      },
      maxCollateral: {
        val: new BN(1e6),
        scale: 0
      }
    }

    const defaultAsset: Asset = {
      feedAddress: new PublicKey(0),
      lastUpdate: new BN(1),
      price: {
        val: new BN(1).mul(new BN(1000000)),
        scale: 0
      },
      confidence: {
        val: new BN(1),
        scale: 0
      },
      twap: {
        val: new BN(1),
        scale: 0
      },
      twac: {
        val: new BN(1),
        scale: 0
      },
      status: PriceStatus.Trading
    }
    const synthetics = 'xSOL xETH'.split(' ').map(
      (i): ExchangeSyntheticTokens => {
        return { symbol: i, balance: new BN(0), ...defaultAsset, ...defaultSynthetic }
      }
    )
    synthetics[0].balance = new BN(100).mul(new BN(10000))
    synthetics[1].balance = new BN(10).mul(new BN(10000))
    synthetics[1].price = {
      val: new BN(10).mul(new BN(1000000)),
      scale: 4
    }

    const collaterals = 'WSOL ETH'.split(' ').map(
      (i): ExchangeCollateralTokens => {
        return {
          symbol: i,
          balance: new BN(0),
          ...defaultAsset,
          ...defaultCollateral,
          price: {
            ...defaultAsset.price,
            val: new BN(3).mul(new BN(1000))
          }
        }
      }
    )
    collaterals[0].balance = new BN(100).mul(new BN(10000))
    collaterals[1].balance = new BN(10).mul(new BN(10000))
    collaterals[1].price = {
      val: new BN(10).mul(new BN(1000000)),
      scale: 4
    }
    const pairs: BorrowedPair[] = synthetics.map((synth, index) => ({
      syntheticData: synth,
      collateralData: collaterals[index],
      synthetic: new PublicKey(0),
      collateral: new PublicKey(0),
      collateralReserve: new PublicKey(0),
      fee: {
        val: new BN(30000),
        scale: 6
      },
      bump: 1,
      halted: false,
      collateralRatio: {
        val: new BN(5000),
        scale: 4
      },
      liquidationThreshold: {
        val: new BN(867),
        scale: 3
      },
      liquidationRatio: {
        val: new BN(30000),
        scale: 0
      },
      liquidationPenaltyLiquidator: {
        val: new BN(30000),
        scale: 0
      },
      liquidationPenaltyExchange: {
        val: new BN(30000),
        scale: 0
      },
      debtInterestRate: {
        val: new BN(30000),
        scale: 0
      },
      accumulatedInterest: {
        val: new BN(2175),
        scale: 2
      },
      accumulatedInterestRate: {
        val: new BN(2185),
        scale: 2
      },
      mintAmount: {
        val: new BN(30000),
        scale: 0
      },
      collateralAmount: {
        val: new BN(30000),
        scale: 0
      },
      maxBorrow: {
        val: new BN(3256349),
        scale: 4
      },
      lastUpdate: new BN(30000)
    }))

    const userVaults: UserVaults[] = [
      {
        owner: new PublicKey(0),
        vault: new PublicKey(0),
        lastAccumulatedInterestRate: {
          val: new BN(30000),
          scale: 0
        },
        syntheticAmount: {
          val: new BN(30000),
          scale: 0
        },
        collateralAmount: {
          val: new BN(30000),
          scale: 0
        },
        collateral: 'WSOL',
        borrowed: 'xSOL',
        currentDebt: 11999.4325,
        deposited: 101035.4215,
        depositedSign: 'xSOL',
        cRatio: '125.645',
        interestRate: '25.4545',
        liquidationPrice: '125.32654',
        maxBorrow: '300',
        currentDebtSign: '$',
        minCRatio: 100
      },
      {
        owner: new PublicKey(0),
        vault: new PublicKey(0),
        lastAccumulatedInterestRate: {
          val: new BN(30),
          scale: 0
        },
        syntheticAmount: {
          val: new BN(30),
          scale: 0
        },
        collateralAmount: {
          val: new BN(30),
          scale: 0
        },
        collateral: 'ETH',
        borrowed: 'xETH',
        currentDebt: 11999.4325,
        deposited: 101035.4215,
        depositedSign: 'xETH',
        cRatio: '25.645',
        interestRate: '15.45',
        liquidationPrice: '15.32654',
        maxBorrow: '500',
        currentDebtSign: '$',
        minCRatio: 100
      }
    ]
    return (
      <Grid style={{ maxWidth: '1420px' }}>
        <WrappedBorrow
          pairs={pairs}
          sending={false}
          hasError={false}
          userVaults={userVaults}
          onClickSubmitButton={() => {}}
          setActualPair={() => {}}
          availableCollateral={new BN(0)}
          availableRepay={new BN(0)}
          actualVault={{
            collateralAmount: { val: new BN(0), scale: 0 },
            borrowAmount: { val: new BN(0), scale: 0 }
          }} />
      </Grid>
    )
  })
)
