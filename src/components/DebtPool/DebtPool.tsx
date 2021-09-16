import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import useStyles from './style'
import { colors } from '@static/theme'

export interface Data {
  id: string
  label: string
  value: number
  color: string
  price: number
}

export interface IProps {
  title: string
  subTitle: string
  data: Data[]
}
export const DebtPool: React.FC<IProps> = ({ title, subTitle, data }) => {
  const [label, setLabel] = React.useState<String>('')
  const [percent, setPercent] = React.useState<String>('')
  const classes = useStyles()
  return (
    <Card className={classes.debtPoolCard}>
      <CardContent>
        <Typography className={classes.debtPoolCardTitle}>{title}</Typography>
        <Typography className={classes.debtPoolCardSubTitle}>{subTitle}</Typography>
        <Grid className={classes.pieContainer}>
          <Grid className={classes.pieCanvasBackground}>
            <Grid className={classes.tooltipContainer}>
              <Typography component="h2" className={classes.tooltipLabel}>
                {label}
              </Typography>
              <Typography component='p' className={classes.tooltipValue}>
                {percent}
              </Typography>
            </Grid>
            <Grid className={classes.pieCanvasGrid}>
              <ResponsivePie
                data={data}
                margin={{ top: 6, right: 6, bottom: 6, left: 6 }}
                sortByValue={true}
                activeOuterRadiusOffset={5}
                borderWidth={1}
                borderColor={{ from: 'color' }}
                startAngle={0}
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
                tooltip={() => (
                  <div
                    className={classes.tooltipContainerDisable}>
                  </div>
                )}
                onMouseEnter={event => {
                  const variable: string = event.id.toString()
                  setLabel(event.label.toString())
                  setPercent(`${Number(event.formattedValue).toFixed(2)}%`)
                  var element = document.getElementById(variable)
                  if (element != null) {
                    element.style.background = `${colors.navy.navButton}40`
                    element.style.borderRadius = '10px'
                  }
                }}
                onMouseLeave={event => {
                  const variable: string = event.id.toString()
                  setLabel('')
                  setPercent('')
                  var element = document.getElementById(variable)
                  if (element != null) {
                    element.style.background = colors.navy.component
                    element.style.borderRadius = '0px'
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
