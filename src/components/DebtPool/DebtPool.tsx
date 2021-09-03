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
  const classes = useStyles()
  return (
    <Card className={classes.debtPoolCard}>
      <CardContent>
        <Typography className={classes.debtPoolCardTitle}>{title}</Typography>
        <Typography className={classes.debtPoolCardSubTitle}>{subTitle}</Typography>
        <Grid className={classes.pieContainer}>
          <Grid className={classes.pieCanvasBackground}>
            <Grid className={classes.pieCanvasGrid} justifyContent='center'>
              <ResponsivePie
                data={data}
                margin={{ top: 6, right: 6, bottom: 6, left: 6 }}
                sortByValue={true}
                activeOuterRadiusOffset={5}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['brighter', 1.9]] }}
                startAngle={0}
                enableArcLinkLabels={false}
                arcLinkLabelsTextColor='#333333'
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                enableArcLabels={false}
                arcLabelsRadiusOffset={0}
                colors={{ datum: 'data.color' }}
                arcLabelsTextColor='#000000'
                tooltip={({ datum: { id, color, label } }) => (
                  <div
                    className={classes.tooltipContainer}
                    style={{
                      background: color
                    }}>
                    <div
                      className={classes.tooltip}
                      style={{
                        ...(label === 'xLTC'
                          ? { color: colors.black.background, borderColor: color }
                          : { color: ' #ffffff', borderColor: color })
                      }}>
                      {id}
                    </div>
                  </div>
                )}
                onMouseEnter={event => {
                  const variable: string = event.id.toString()
                  var element = document.getElementById(variable)
                  if (element != null) {
                    element.style.background = `${colors.navy.navButton}40`
                    element.style.borderRadius = '10px'
                  }
                }}
                onMouseLeave={event => {
                  const variable: string = event.id.toString()
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
