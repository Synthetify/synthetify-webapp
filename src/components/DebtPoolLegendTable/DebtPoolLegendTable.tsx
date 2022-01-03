import React, { useRef } from 'react'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import classNames from 'classnames'
import { theme } from '@static/theme'
import useStyles from './style'

export interface Data {
  id: string
  label: string
  color: string
  percent: number
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

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  const rootRef = useRef<HTMLDivElement>(null)

  const calcEmptyRowsToRender = () => {
    if (isXsDown || !rootRef.current) {
      return 0
    }

    if (isSmDown) {
      return Math.ceil((rootRef.current.offsetHeight - (data.length + 1) * 40) / 40)
    }

    return Math.ceil((rootRef.current.offsetHeight - 60 - data.length * 48) / 48)
  }

  const calcMaxHeight = () => {
    const plotCardHeight = document.getElementById('debtPlot')?.offsetHeight ?? 0

    if (!isXsDown) {
      const tableHeight = isSmDown ? (data.length + 1) * 40 : 60 + data.length * 48

      return Math.max(tableHeight, plotCardHeight)
    }

    return 'unset'
  }

  const formatTableValue = (value: string) => {
    const numVal = Number(value)

    if (Math.abs(numVal) < 1000) {
      return Number(numVal.toFixed(4)).toLocaleString('en-US')
    }

    if (Math.abs(numVal) < 100000) {
      return Number(numVal.toFixed(2)).toLocaleString('en-US')
    }

    if (Math.abs(numVal) < 1000000) {
      return Number(numVal.toFixed(1)).toLocaleString('en-US')
    }

    return Number(numVal.toFixed(0)).toLocaleString('en-US')
  }

  return (
    <Grid className={classes.root} ref={rootRef} style={{ maxHeight: calcMaxHeight() }}>
      <Grid className={classes.header} container direction='row'>
        <Grid className={classes.column} container item justifyContent='center' alignItems='center'>
          <Typography className={classes.headerText}>TOKEN</Typography>
        </Grid>

        <Grid className={classes.column} container item justifyContent='center' alignItems='center'>
          <Typography className={classes.headerText}>DELTA</Typography>
        </Grid>
      </Grid>

      {data
        .sort(
          (a, b) =>
            Math.abs(b.debt.usdValue - b.collateral.usdValue) -
            Math.abs(a.debt.usdValue - a.collateral.usdValue)
        )
        .map((token, index) => {
          const delta = token.debt.amount - token.collateral.amount
          return (
            <Grid key={index} id={token.id} className={classes.row} container direction='row'>
              <Grid
                className={classes.column}
                container
                item
                justifyContent='center'
                alignItems='center'>
                <Typography className={classes.tokenName} style={{ color: token.color }}>
                  {token.label}
                  {' ('}
                  <AnimatedNumber
                    value={token.percent}
                    duration={500}
                    formatValue={(value: string) => Number(value).toFixed(2)}
                  />
                  {'%)'}
                </Typography>
              </Grid>

              <Grid
                className={classNames(classes.column, classes.dataCell)}
                container
                item
                direction='row'
                justifyContent='center'
                alignItems='center'>
                <Typography
                  className={classNames(
                    classes.tokenAmount,
                    delta < 0 ? classes.negative : undefined
                  )}>
                  <AnimatedNumber
                    value={token.debt.amount - token.collateral.amount}
                    duration={500}
                    formatValue={formatTableValue}
                  />
                  {` ${token.label} `}
                </Typography>
                <Typography
                  className={classNames(
                    classes.tokenValue,
                    delta < 0 ? classes.negative : undefined
                  )}>
                  &nbsp;{'/ $'}
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
      {[...Array(calcEmptyRowsToRender()).keys()].map((_e, index) => (
        <Grid key={`empty${index}`} className={classes.row} container direction='row'>
          <Grid className={classes.column} />
          <Grid className={classes.column} />
          <Grid className={classes.column} />
          <Grid className={classes.column} />
        </Grid>
      ))}
    </Grid>
  )
}

export default LegendDebtPool
