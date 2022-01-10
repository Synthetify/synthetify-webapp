import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Grid } from '@material-ui/core'
import ActionMenuBorrow, { IActionContents } from './ActionMenuBorrow'
import { ActionBorrow } from './ActionBorrow'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { Asset, Decimal, OracleType, PriceStatus, Synthetic } from '@synthetify/sdk/lib/exchange'
import { ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import { BorrowedPair } from '../WrappedBorrow/WrappedBorrow'

storiesOf('borrow/switchBorrow', module)
  .addDecorator(withKnobs)
  .add('Actions', () =>
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
      const synthetics = 'xUSD xDOGE xSOL xFFT xETH x1INCH xAAVE xAERGO xAETH xAKRO'
        .split(' ')
        .map((i): ExchangeSyntheticTokens => {
          return { symbol: i, balance: new BN(0), ...defaultAsset, ...defaultSynthetic }
        })
      synthetics[0].balance = new BN(100).mul(new BN(10000))
      synthetics[1].balance = new BN(10).mul(new BN(10000))
      synthetics[1].price = {
        val: new BN(10).mul(new BN(1000000)),
        scale: 4
      }

      const collaterals = 'USDC DOGE WSOL FFT ETH 1INCH AAVE AERGO AETH AKRO'
        .split(' ')
        .map((i): { reserveBalance: number; symbol: string; price: Decimal; balance: BN } => {
          return {
            symbol: i,
            balance: new BN(0),
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
        halted: false,
        collateralRatio: {
          val: new BN(30000),
          scale: 5
        },
        liquidationThreshold: {
          val: new BN(50000),
          scale: 5
        },
        liquidationRatio: {
          val: new BN(50000),
          scale: 5
        },
        liquidationPenaltyLiquidator: {
          val: new BN(50000),
          scale: 6
        },
        liquidationPenaltyExchange: {
          val: new BN(50000),
          scale: 6
        },
        debtInterestRate: {
          val: new BN(50000),
          scale: 6
        },
        accumulatedInterest: {
          val: new BN(50000),
          scale: 6
        },
        accumulatedInterestRate: {
          val: new BN(50000),
          scale: 6
        },
        mintAmount: {
          val: new BN(5000000),
          scale: 6
        },
        collateralAmount: {
          val: new BN(1000000),
          scale: 6
        },
        maxBorrow: {
          val: new BN(1000000000),
          scale: 6
        },
        lastUpdate: new BN(30000),
        oracleType: 0 as OracleType,
        collateralPriceFeed: new PublicKey(0),
        liquidationFund: new PublicKey(0),
        openFee: { val: new BN(10), scale: 3 },
        vaultType: 1
      }))

      const [cRatio, setCRatio] = React.useState('100.0')
      const changeCRatio = (nr: string) => {
        setCRatio(nr)
      }

      const actionContents: IActionContents = {
        borrow: (
          <ActionBorrow
            cRatio={cRatio}
            changeCRatio={changeCRatio}
            liquidationPriceTo={3.458}
            liquidationPriceFrom={8.456}
            onClickSubmitButton={() => {}}
            pairs={pairs}
            sending={false}
            hasError={false}
            action={'borrow'}
            vaultAmount={{
              collateralAmount: { val: new BN(0), scale: 0 },
              borrowAmount: { val: new BN(0), scale: 0 }
            }}
            availableTo={new BN(1000000)}
            availableFrom={new BN(1000000)}
            setLiquidationPriceTo={(nr: number) => {
              console.log(nr)
            }}
            setLiquidationPriceFrom={(nr: number) => {
              console.log(nr)
            }}
            setAvailableBorrow={(nr: BN) => {
              console.log(nr)
            }}
            setAvailableWithdraw={(nr: BN) => {
              console.log(nr)
            }}
            pairIndex={1}
            setPairIndex={() => {}}
            walletStatus={true}
            noWalletHandler={() => {}}
          />
        ),
        repay: (
          <ActionBorrow
            action={'repay'}
            cRatio={'---'}
            liquidationPriceTo={2}
            liquidationPriceFrom={1.5}
            onClickSubmitButton={() => {}}
            pairs={pairs}
            sending={false}
            hasError={false}
            changeCRatio={changeCRatio}
            vaultAmount={{
              collateralAmount: { val: new BN(1000000), scale: 6 },
              borrowAmount: { val: new BN(1000000), scale: 6 }
            }}
            availableTo={new BN(1000000)}
            availableFrom={new BN(1000000)}
            setLiquidationPriceTo={(nr: number) => {
              console.log(nr)
            }}
            setLiquidationPriceFrom={(nr: number) => {
              console.log(nr)
            }}
            setAvailableBorrow={(nr: BN) => {
              console.log(nr)
            }}
            setAvailableWithdraw={(nr: BN) => {
              console.log(nr)
            }}
            pairIndex={0}
            setPairIndex={() => {}}
            walletStatus={true}
            noWalletHandler={() => {}}
          />
        )
      }

      return (
        <div style={{ padding: '24px' }}>
          <Grid style={{ maxWidth: 980 }}>
            <ActionMenuBorrow actionContents={actionContents} />
          </Grid>
        </div>
      )
    })
  )
