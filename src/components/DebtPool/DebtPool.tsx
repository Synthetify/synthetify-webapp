import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import AnimatedNumber from '@components/AnimatedNumber'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
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
  const [label, setLabel] = React.useState<String>('TOTAL DEBT')
  const [info, setInfo] = React.useState<String>('')
  const [display, setDisplay] = React.useState<boolean>(true)

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
              <Typography component='p' className={classes.tooltipValue}>
                {info}
              </Typography>
              <Typography
                component='p'
                className={classes.tooltipTotal}
                style={{ display: `${display ? 'block' : 'none'}` }}>
                <AnimatedNumber
                  $
                  value={data.reduce((sum, item) => {
                    return sum + item.debt.usdValue
                  }, 0)}
                  duration={500}
                  formatValue={(value: string) =>
                    '$' + (
                      Math.abs(Number(value)) > 10000000
                        ? Number((Number(value) / 1000000).toFixed(1)).toLocaleString('pl-PL') + 'M'
                        : Number(Number(value).toFixed(0)).toLocaleString('pl-PL')
                    )
                  }
                />
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
                  const variable: string = event.id.toString()
                  setLabel('DELTA')
                  setInfo(
                    '$' + (
                      Math.abs(Number(event.formattedValue)) > 10000000
                        ? Number((Number(event.formattedValue) / 1000000).toFixed(1)).toLocaleString('pl-PL') + 'M'
                        : Number(Number(event.formattedValue).toFixed(0)).toLocaleString('pl-PL')
                    )
                  )
                  setDisplay(false)
                  var element = document.getElementById(variable)
                  if (element != null) {
                    element.classList.add('light')
                  }
                }}
                onMouseLeave={event => {
                  const variable: string = event.id.toString()
                  setLabel('TOTAL DEBT')
                  setInfo('')
                  setDisplay(true)
                  var element = document.getElementById(variable)
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
