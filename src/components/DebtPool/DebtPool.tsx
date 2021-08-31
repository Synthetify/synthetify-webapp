import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import useStyles from './style'

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
                colors={{ scheme: 'category10' }}
                arcLabelsTextColor='#000000'
                tooltip={({ datum: { id, color } }) => (
                  <div
                    style={{
                      borderRadius: '8px',
                      filter: 'brightness(120%)',
                      boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.4)',
                      background: `${color}`
                    }}>
                    <div
                      style={{
                        fontSize: '19px',
                        fontStyle: 'normal',
                        lineHeight: '40px',
                        fontWeight: 700,
                        width: '80px',
                        height: '36px',
                        textAlign: 'center',
                        padding: '1px',
                        color: '#ffffff',
                        border: `1px solid ${color}`,
                        borderRadius: '10px',
                        filter: 'brightness(170%)'
                      }}>
                      {id}
                    </div>
                  </div>
                )}
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
