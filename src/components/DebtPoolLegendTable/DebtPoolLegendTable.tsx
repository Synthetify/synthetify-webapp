import React from 'react'
import {
  Grid,
  Typography
} from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import classNames from 'classnames'
import useStyles from './style'

export interface Data {
  id: string
  label: string
  color: string
  debt: {
    amount: number
    usdValue: number
  }
  collateral: {
    amount: number
    usdValue: number
  }
}

export interface IProps {
  data: Data[]
}
export const LegendDebtPool: React.FC<IProps> = ({ data }) => {
  const classes = useStyles()

  const formatTableValue = (value: string) => {
    const numVal = Number(value)

    if (Math.abs(numVal) < 1000) {
      return numVal.toFixed(4)
    }

    if (Math.abs(numVal) < 1000000) {
      return numVal.toFixed(2)
    }

    return numVal.toFixed(0)
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.header} container direction='row'>
        <Grid className={classes.column} />

        <Grid className={classes.column} container item justifyContent='center' alignItems='center'>
          <Typography className={classes.headerText}>DEBT</Typography>
        </Grid>

        <Grid className={classes.column} container item justifyContent='center' alignItems='center'>
          <Typography className={classes.headerText}>COLLATERAL</Typography>
        </Grid>

        <Grid className={classes.column} container item justifyContent='center' alignItems='center'>
          <Typography className={classes.headerText}>DELTA</Typography>
        </Grid>
      </Grid>

      {data
        .sort((a, b) => (Math.abs(b.debt.usdValue - b.collateral.usdValue) - Math.abs(a.debt.usdValue - a.collateral.usdValue)))
        .map((token, index) => {
          const delta = token.debt.amount - token.collateral.amount
          return (
            <Grid key={index} id={token.id} className={classes.row} container direction='row'>
              <Grid className={classes.column} container item justifyContent='center' alignItems='center'>
                <Typography className={classes.tokenName} style={{ color: token.color }}>{token.label}</Typography>
              </Grid>

              <Grid className={classNames(classes.column, classes.dataCell)} container item direction='column' justifyContent='center'>
                <Typography className={classes.tokenAmount}>
                  <AnimatedNumber
                    value={token.debt.amount}
                    duration={500}
                    formatValue={formatTableValue}
                  />
                  {' '}{token.label}
                </Typography>
                <Typography className={classes.tokenValue}>
                  $
                  <AnimatedNumber
                    value={token.debt.usdValue}
                    duration={500}
                    formatValue={formatTableValue}
                  />
                </Typography>
              </Grid>

              <Grid className={classNames(classes.column, classes.dataCell)} container item direction='column' justifyContent='center'>
                <Typography className={classes.tokenAmount}>
                  <AnimatedNumber
                    value={token.collateral.amount}
                    duration={500}
                    formatValue={formatTableValue}
                  />
                  {' '}{token.label}
                </Typography>
                <Typography className={classes.tokenValue}>
                  $
                  <AnimatedNumber
                    value={token.collateral.usdValue}
                    duration={500}
                    formatValue={formatTableValue}
                  />
                </Typography>
              </Grid>

              <Grid className={classNames(classes.column, classes.dataCell)} container item direction='column' justifyContent='center' >
                <Typography className={classNames(classes.tokenAmount, delta < 0 ? classes.negative : undefined)}>
                  <AnimatedNumber
                    value={token.debt.amount - token.collateral.amount}
                    duration={500}
                    formatValue={formatTableValue}
                  />
                  {' '}{token.label}
                </Typography>
                <Typography className={classNames(classes.tokenValue, delta < 0 ? classes.negative : undefined)}>
                  $
                  <AnimatedNumber
                    value={token.debt.usdValue - token.collateral.usdValue}
                    duration={500}
                    formatValue={formatTableValue}
                  />
                </Typography>
              </Grid>
            </Grid>
          )
        })}
    </Grid>
  )
}

export default LegendDebtPool
