import React from 'react'
import {
  Grid,
  Typography
} from '@material-ui/core'
import useStyle from './style'
import AnimatedNumber from '@components/AnimatedNumber'

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
  const classes = useStyle()

  return (
    <Grid className={classes.root}>
      <Grid className={classes.header}>
        <Grid className={classes.column} />

        <Grid className={classes.column}>
          <Typography className={classes.headerText}>DEBT</Typography>
        </Grid>

        <Grid className={classes.column}>
          <Typography className={classes.headerText}>COLLATERAL</Typography>
        </Grid>

        <Grid className={classes.column}>
          <Typography className={classes.headerText}>DELTA</Typography>
        </Grid>
      </Grid>

      {data.map((token, index) => (
        <Grid key={index} id={token.id} className={classes.row}>
          <Grid className={classes.column}>
            <Typography className={classes.tokenName} style={{ color: token.color }}>{token.label}</Typography>
          </Grid>

          <Grid className={classes.column}>
            <Typography className={classes.tokenAmount}>{token.debt.amount} {token.label}</Typography>
            <Typography className={classes.tokenValue}>${token.debt.usdValue}</Typography>
          </Grid>

          <Grid className={classes.column}>
            <Typography className={classes.tokenAmount}>{token.collateral.amount} {token.label}</Typography>
            <Typography className={classes.tokenValue}>${token.collateral.usdValue}</Typography>
          </Grid>

          <Grid className={classes.column}>
            <Typography className={classes.tokenAmount}>{token.debt.amount - token.collateral.amount} {token.label}</Typography>
            <Typography className={classes.tokenValue}>${token.debt.usdValue - token.collateral.usdValue}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default LegendDebtPool
