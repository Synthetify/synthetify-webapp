/* eslint-disable @typescript-eslint/indent */
import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import { colors } from '@static/theme'
import useStyles from './style'

export interface Data {
  id: string
  label: string
  color: string
  percent: number
  value: number
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
  title: string
  subTitle: string
  data: Data[]
}
export const DebtPool: React.FC<IProps> = ({ title, subTitle, data }) => {
  const formatVal = (value: number) =>
    Math.abs(+value) >= 10000000
      ? Number((value / 1000000).toFixed(1))
          .toLocaleString('pl-PL')
          .replace(',', '.') + 'M'
      : Number(value.toFixed(0)).toLocaleString('pl-PL')

  const [label, setLabel] = React.useState<String>('TOTAL DEBT')
  const [infoNumber, setInfoNumber] = React.useState<number>(0)

  const classes = useStyles()
  data.sort(
    (a, b) =>
      Math.abs(a.debt.usdValue - a.collateral.usdValue) -
      Math.abs(b.debt.usdValue - b.collateral.usdValue)
  )

  return (
    <Card className={classes.debtPoolCard} id='debtPlot'>
      <CardContent className={classes.debtPoolCardContent}>
        <Typography className={classes.debtPoolCardTitle}>{title}</Typography>
        <Typography className={classes.debtPoolCardSubTitle}>{subTitle}</Typography>
        <Grid className={classes.pieContainer}>
          <Grid className={classes.pieCanvasBackground}>
            <Grid className={classes.tooltipContainer}>
              <Typography component='h2' className={classes.tooltipLabel}>
                {label}
              </Typography>
              <Typography
                component='p'
                className={classes.tooltipValue}
                style={
                  label !== 'TOTAL DEBT' && infoNumber < 0
                    ? { color: colors.red.negative }
                    : undefined
                }>
                $
                {formatVal(
                  label === 'TOTAL DEBT'
                    ? data.reduce((sum, item) => {
                        return sum + item.debt.usdValue
                      }, 0)
                    : infoNumber
                )}
              </Typography>
            </Grid>
            <Grid className={classes.pieCanvasGrid}>
              <ResponsivePie
                data={data}
                margin={{ top: 6, right: 6, bottom: 6, left: 6 }}
                activeOuterRadiusOffset={5}
                borderWidth={1}
                borderColor={{ from: 'color' }}
                startAngle={0}
                endAngle={-360}
                innerRadius={0.75}
                padAngle={2.5}
                enableArcLinkLabels={false}
                arcLinkLabelsTextColor='#333333'
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                enableArcLabels={false}
                arcLabelsRadiusOffset={0}
                colors={{ datum: 'data.color' }}
                arcLabelsTextColor='#000000'
                tooltip={() => null}
                onMouseEnter={event => {
                  const elementIndex = data.findIndex(element => element.label === event.label)
                  setLabel(`${event.label.toString()} (${data[elementIndex].percent.toFixed(2)}%)`)
                  setInfoNumber(
                    data[elementIndex].debt.usdValue - data[elementIndex].collateral.usdValue
                  )
                  const element = document.getElementById(event.id.toString())
                  if (element != null) {
                    element.classList.add('light')
                  }
                }}
                onMouseLeave={event => {
                  setLabel('TOTAL DEBT')
                  setInfoNumber(0)
                  const element = document.getElementById(event.id.toString())
                  if (element != null) {
                    element.classList.remove('light')
                  }
                }}
                legends={[]}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default DebtPool
