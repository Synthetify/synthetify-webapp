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

      {data.map((token, index) => {
        const delta = token.debt.amount - token.collateral.amount
        return (
          <Grid key={index} id={token.id} className={classes.row} container direction='row'>
            <Grid className={classes.column} container item justifyContent='center' alignItems='center'>
              <Typography className={classes.tokenName} style={{ color: token.color }}>{token.label}</Typography>
            </Grid>

            <Grid className={classNames(classes.column, classes.dataCell)} container item direction='column' justifyContent='center'>
              <Typography className={classes.tokenAmount}>
                {token.debt.amount} {token.label}
              </Typography>
              <Typography className={classes.tokenValue}>
                ${token.debt.usdValue}
              </Typography>
            </Grid>

            <Grid className={classNames(classes.column, classes.dataCell)} container item direction='column' justifyContent='center'>
              <Typography className={classes.tokenAmount}>
                {token.collateral.amount} {token.label}
              </Typography>
              <Typography className={classes.tokenValue}>
                ${token.collateral.usdValue}
              </Typography>
            </Grid>

            <Grid className={classNames(classes.column, classes.dataCell)} container item direction='column' justifyContent='center' >
              <Typography className={classNames(classes.tokenAmount, delta < 0 ? classes.negative : undefined)}>
                {token.debt.amount - token.collateral.amount} {token.label}
              </Typography>
              <Typography className={classNames(classes.tokenValue, delta < 0 ? classes.negative : undefined)}>
                ${token.debt.usdValue - token.collateral.usdValue}
              </Typography>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default LegendDebtPool
