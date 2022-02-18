import { Grid, Hidden, Typography } from '@material-ui/core'
import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { CopyPopover } from '@components/CopyPopover/CopyPopover'
import { formatNumbers, printBN, showPrefix } from '@consts/utils'
import AnimatedNumber from '@components/AnimatedNumber'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import ExclamationMark from '@static/svg/exclamationMark.svg'
import { getLeverageLevel } from '@consts/leverageUtils'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import useStyles from './style'
import { BN } from '@project-serum/anchor'

interface IGeneralInfo {
  collateralAmount: string
  debtAmount: string
  collateral: string
  borrowed: string
  limit: number
  liqRatio: Decimal
  collateralAddress: PublicKey
  borrowedAddress: PublicKey
  borrowedSign: string
  amountSign: string
  callPrice: Decimal
  borrPrice: Decimal
  interestRate: string
  cRatio: number
  openFee: number
  vaultType: number
  page: string
  fee?: string
  buying?: string
}

export const BorrowInfo: React.FC<IGeneralInfo> = ({
  collateral,
  collateralAddress,
  collateralAmount,
  borrowed,
  borrowedAddress,
  liqRatio,
  limit,
  debtAmount,
  borrowedSign,
  amountSign,
  callPrice,
  borrPrice,
  interestRate,
  cRatio,
  openFee,
  vaultType,
  page,
  fee = '0',
  buying = '0'
}) => {
  const classes = useStyles()
  const alphabetTable = ['A', 'D', 'C', 'B', 'E', 'F']
  const liquidationRatio = liqRatio.val.eq(new BN(0))
    ? 0
    : Number(Math.pow(Number(printBN(liqRatio.val, liqRatio.scale)), -1) * 100)
  return (
    <Grid className={classes.root}>
      <Grid className={classes.wrapper}>
        <Typography className={classes.infoTitle}>Totals</Typography>
        <Grid container item className={classes.infoWrapper}>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>
              <Hidden mdDown>Collateral amount</Hidden>
              <Hidden only={['lg', 'xl']}>Coll. amount</Hidden>:
            </Typography>
            <Typography className={classes.positionValue}>
              {amountSign}{' '}
              <AnimatedNumber value={collateralAmount} formatValue={formatNumbers} duration={300} />
              {showPrefix(Number(collateralAmount))}
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Debt amount:</Typography>
            <Typography className={classes.positionValue}>
              {amountSign}{' '}
              <AnimatedNumber value={debtAmount} formatValue={formatNumbers} duration={300} />
              {showPrefix(Number(debtAmount))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.wrapper}>
        <Typography className={classes.infoTitle}> General info</Typography>
        <Grid className={classes.infoWrapper}>
          {page === 'vault' ? (
            <>
              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Collateral:</Typography>
                <Typography className={classes.positionValue}>{collateral}</Typography>
              </Grid>

              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Borrowed asset:</Typography>
                <Typography className={classes.positionValue}>{borrowed}</Typography>
              </Grid>

              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Type:</Typography>
                <Typography className={classes.positionValue}>
                  {alphabetTable[vaultType]}
                  <MobileTooltip
                    hint={
                      <>
                        <img src={ExclamationMark} alt='' className={classes.circleIcon} />
                        <Typography className={classes.tooltipTitle} style={{ marginBottom: 10 }}>
                          What are types?
                        </Typography>
                        Some of the pairs appear multiple times, they are distinguished by type.
                        Depending on the type, the following parameters change: <br />
                        <span style={{ fontWeight: 900 }}>
                          Liquidation ratio, collateral ratio, interest rate <br />
                          and open fee
                        </span>
                      </>
                    }
                    anchor={
                      <img src={ExclamationMark} alt='' className={classes.exclamationMark} />
                    }
                    mobilePlacement='top-end'
                    desktopPlacement='top-end'
                  />
                </Typography>
              </Grid>

              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Coll. price:</Typography>
                <Typography className={classes.positionValue}>
                  {'$ '}
                  <AnimatedNumber
                    value={printBN(callPrice.val, callPrice.scale)}
                    formatValue={(value: string) => Number(value).toFixed(2)}
                  />
                </Typography>
              </Grid>
              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Borr. asset price:</Typography>
                <Typography className={classes.positionValue}>
                  {'$ '}
                  <AnimatedNumber
                    value={printBN(borrPrice.val, borrPrice.scale)}
                    formatValue={(value: string) => Number(value).toFixed(2)}
                  />
                </Typography>
              </Grid>

              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Left to borrow:</Typography>
                <Typography className={classes.positionValue}>
                  {limit.toFixed(3)} {borrowedSign}
                </Typography>
              </Grid>

              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Liquidation ratio:</Typography>
                <Typography className={classes.positionValue}>
                  <AnimatedNumber
                    value={liquidationRatio}
                    formatValue={(value: number) => value.toFixed(2)}
                    duration={300}
                  />
                  %
                </Typography>
              </Grid>

              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Collateral ratio:</Typography>
                <Typography className={classes.positionValue}>
                  <AnimatedNumber
                    value={cRatio}
                    formatValue={(value: number) => value.toFixed(2)}
                    duration={300}
                  />
                  {showPrefix(Number(cRatio))} %
                </Typography>
              </Grid>

              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Interest rate:</Typography>
                <Typography className={classes.positionValue}>
                  {(Number(interestRate) / 100).toFixed(2)} %
                </Typography>
              </Grid>

              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Open fee:</Typography>
                <Typography className={classes.positionValue}>{openFee.toFixed(2)} %</Typography>
              </Grid>
            </>
          ) : (
            <>
              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Collateral:</Typography>
                <Typography className={classes.positionValue}>{collateral}</Typography>
              </Grid>
              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Leverage asset:</Typography>
                <Typography className={classes.positionValue}>{borrowed}</Typography>
              </Grid>
              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Max leverage:</Typography>
                <Typography className={classes.positionValue}>
                  {getLeverageLevel(cRatio * 1.015)}x
                </Typography>
              </Grid>
              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Liquidation ratio:</Typography>
                <Typography className={classes.positionValue}>
                  <AnimatedNumber
                    value={liquidationRatio}
                    formatValue={(value: number) => value.toFixed(2)}
                    duration={300}
                  />
                  %
                </Typography>
              </Grid>
              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Lev. asset price:</Typography>
                <Typography className={classes.positionValue}>
                  {'$ '}
                  <AnimatedNumber
                    value={printBN(borrPrice.val, borrPrice.scale)}
                    formatValue={(value: string) => Number(value).toFixed(2)}
                  />
                </Typography>
              </Grid>

              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Fee:</Typography>
                <Typography className={classes.positionValue}>${Number(fee).toFixed(2)}</Typography>
              </Grid>
              <Grid
                container
                item
                className={classes.infoPosition}
                justifyContent='space-between'
                alignItems='center'>
                <Typography className={classes.positionTitle}>Buying {collateral}:</Typography>
                <Typography className={classes.positionValue}>
                  <AnimatedNumber value={buying} formatValue={formatNumbers} duration={300} />
                  {showPrefix(Number(buying))} {collateral}
                </Typography>
              </Grid>
            </>
          )}

          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>
              <Hidden mdDown>Collateral address:</Hidden>
              <Hidden only={['lg', 'xl']}>Coll. address:</Hidden>
            </Typography>
            <Grid container style={{ width: 'max-content' }}>
              <CopyPopover address={collateralAddress} />
              <Typography className={classes.positionValue}>
                {collateralAddress.toString().substr(0, 6)}...
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>
              {page === 'vault' ? (
                <>
                  <Hidden mdDown>Borrowed asset address:</Hidden>
                  <Hidden only={['lg', 'xl']}>Borr. address:</Hidden>
                </>
              ) : (
                <>
                  <Hidden mdDown>Leverage asset address:</Hidden>
                  <Hidden only={['lg', 'xl']}>Lever. address:</Hidden>
                </>
              )}
            </Typography>
            <Grid container style={{ width: 'max-content' }}>
              <CopyPopover address={borrowedAddress} />
              <Typography className={classes.positionValue}>
                {borrowedAddress.toString().substr(0, 6)}...
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
