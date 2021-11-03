import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import { colors } from '@static/theme'
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
  title: string
  subTitle: string
  data: Data[]
}
export const DebtPool: React.FC<IProps> = ({ title, subTitle, data }) => {
  const formatVal = (value: number) => Math.abs(value) > 10000000
    ? Number((value / 1000000).toFixed(1)).toLocaleString('pl-PL').replace(',', '.') + 'M'
    : Number(value.toFixed(0)).toLocaleString('pl-PL')

  const [label, setLabel] = React.useState<String>('TOTAL DEBT')
  const [info, setInfo] = React.useState<String>('$' + formatVal(data.reduce((sum, item) => {
    return sum + item.debt.usdValue
  }, 0)))
  const [negative, setNegative] = React.useState(false)

  const classes = useStyles()
  data.sort((a, b) => (Math.abs(a.debt.usdValue - a.collateral.usdValue) - Math.abs(b.debt.usdValue - b.collateral.usdValue)))

  return (
    <Card className={classes.debtPoolCard}>
      <CardContent className={classes.debtPoolCardContent}>
        <Typography className={classes.debtPoolCardTitle}>{title}</Typography>
        <Typography className={classes.debtPoolCardSubTitle}>{subTitle}</Typography>
        <Grid className={classes.pieContainer}>
          <Grid className={classes.pieCanvasBackground}>
            <Grid className={classes.tooltipContainer}>
              <Typography component='h2' className={classes.tooltipLabel}>
                {label}
              </Typography>
              <Typography component='p' className={classes.tooltipValue} style={negative ? { color: colors.red.negative } : undefined}>
                {info}
              </Typography>
            </Grid>
            <Grid className={classes.pieCanvasGrid}>
              <ResponsivePie
                data={data.map((element) => ({
                  ...element,
                  value: Math.abs(element.debt.usdValue - element.collateral.usdValue)
                }))}
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
                  setLabel('DELTA')
                  setInfo(
                    '$' + formatVal(+event.formattedValue)
                  )
                  setNegative(+event.formattedValue < 0)
                  var element = document.getElementById(event.id.toString())
                  if (element != null) {
                    element.classList.add('light')
                  }
                }}
                onMouseLeave={event => {
                  const sumValue = data.reduce((sum, item) => {
                    return sum + item.debt.usdValue
                  }, 0)
                  setLabel('TOTAL DEBT')
                  setInfo(
                    '$' + formatVal(sumValue)
                  )
                  setNegative(false)
                  var element = document.getElementById(event.id.toString())
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
