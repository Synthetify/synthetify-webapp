import React from 'react'
import { storiesOf } from '@storybook/react'
import { BorrowedPair, WrappedLeverage } from './WrappedLeverage'
import { BN } from '@project-serum/anchor'
import { ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { Asset, Decimal, OracleType, PriceStatus, Synthetic } from '@synthetify/sdk/lib/exchange'
import { Grid } from '@material-ui/core'
import { UserVaults } from '@selectors/exchange'

storiesOf('leverage/wrappedLeverage', module).add('default', () =>
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
    const synthetics = 'xSOL xETH'.split(' ').map((i): ExchangeSyntheticTokens => {
      return { symbol: i, balance: new BN(1000000), ...defaultAsset, ...defaultSynthetic }
    })
    synthetics[0].balance = new BN(100).mul(new BN(10000))
    synthetics[1].balance = new BN(10).mul(new BN(10000))
    synthetics[1].price = {
      val: new BN(10).mul(new BN(1000000)),
      scale: 4
    }

    const collaterals = 'WSOL ETH'
      .split(' ')
      .map((i): { reserveBalance: number; symbol: string; price: Decimal; balance: BN } => {
        return {
          symbol: i,
          balance: new BN(10000000),
          reserveBalance: 6,
          price: {
            ...defaultAsset.price,
            val: new BN(3).mul(new BN(1000))
          }
        }
      })
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
      lastUpdate: new BN(30000),
      oracleType: 0 as OracleType,
      collateralPriceFeed: new PublicKey(0),
      liquidationFund: new PublicKey(0),
      openFee: { val: new BN(10), scale: 3 },
      vaultType: 1
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
          val: new BN(3000000),
          scale: 0
        },
        collateralAmount: {
          val: new BN(3000000),
          scale: 0
        },
        collateral: 'WSOL',
        borrowed: 'xSOL',
        currentDebt: { val: new BN(1000000), scale: 6 },
        deposited: { val: new BN(10000000), scale: 6 },
        cRatio: '125.645',
        interestRate: '25.4545',
        liquidationPrice: '125.32654',
        maxBorrow: '300',
        minCRatio: 100,
        vaultType: 0
      },
      {
        owner: new PublicKey(0),
        vault: new PublicKey(0),
        lastAccumulatedInterestRate: {
          val: new BN(30),
          scale: 0
        },
        syntheticAmount: {
          val: new BN(3000000),
          scale: 0
        },
        collateralAmount: {
          val: new BN(300000),
          scale: 0
        },
        collateral: 'ETH',
        borrowed: 'xETH',
        currentDebt: { val: new BN(1000000), scale: 6 },
        deposited: { val: new BN(10000000), scale: 6 },
        cRatio: '25.645',
        interestRate: '15.45',
        liquidationPrice: '15.32654',
        maxBorrow: '500',
        minCRatio: 100,
        vaultType: 0
      }
    ]
    return (
      <Grid style={{ maxWidth: '1420px', background: '#0C0D2C' }}>
        <WrappedLeverage
          pairs={pairs}
          sending={false}
          hasError={false}
          userVaults={userVaults}
          onClickSubmitButton={() => {}}
          setActualPair={() => {}}
          availableCollateral={new BN(100000000)}
          availableRepay={new BN(1000000000)}
          actualVault={{
            collateralAmount: { val: new BN(0), scale: 0 },
            borrowAmount: { val: new BN(0), scale: 0 }
          }}
          totalGeneralAmount={{
            totalCollateralAmount: 0,
            totalDebtAmount: 0
          }}
          walletStatus={false}
          noWalletHandler={() => {}}
          allSynthetic={[]}
          shortPairs={[]}
          longPairs={[]}
        />
      </Grid>
    )
  })
)
