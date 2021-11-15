import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Grid } from '@material-ui/core'
import ActionMenuBorrow, { IActionContents } from './ActionMenuBorrow'
import { ActionBorrow } from './ActionBorrow'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { Asset, Collateral, PriceStatus, Synthetic, Vault } from '@synthetify/sdk/lib/exchange'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens } from '@selectors/solanaWallet'
interface BorrowedPair extends Vault {
  collateralData: ExchangeCollateralTokens
  syntheticData: ExchangeSyntheticTokens
}
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
      const synthetics = 'xUSD xDOGE xSOL xFFT xETH x1INCH xAAVE xAERGO xAETH xAKRO'.split(' ').map(
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

      const collaterals = 'USDC DOGE WSOL FFT ETH 1INCH AAVE AERGO AETH AKRO'.split(' ').map(
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
          val: new BN(3096),
          scale: 2
        },
        liquidationThreshold: {
          val: new BN(867),
          scale: 2
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

      const [cRatio, setCRatio] = React.useState(100.0)
      const changeCRatio = (nr: number) => {
        setCRatio(nr)
      }

      const actionContents: IActionContents = {
        borrow: (
          <ActionBorrow
            cRatio={cRatio}
            changeCRatio={changeCRatio}
            interestRate={24.68}
            liquidationPriceTo={3.458}
            liquidationPriceFrom={8.456}
            collateralRatioTo={3.45}
            collateralRatioFrom={25.64}
            nameButton={'Add'}
            onClickSubmitButton={() => {}}
            pairs={pairs}
            minCRatio={75}
            sending={false}
          />
        ),
        repay: (
          <ActionBorrow
            cRatio={cRatio}
            interestRate={2.68}
            liquidationPriceTo={3.458}
            liquidationPriceFrom={80.456}
            collateralRatioTo={3.45}
            collateralRatioFrom={125.64}
            nameButton={'Withdraw'}
            onClickSubmitButton={() => {}}
            pairs={pairs}
            minCRatio={50}
            changeCRatio={changeCRatio}
            sending={false}
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