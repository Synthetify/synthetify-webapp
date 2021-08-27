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
    name: string
    description: string
    data: Data[]
  } 
export const DeptPool:React.FC<IProps> = ({name, description, data}) =>{
    const classes = useStyles()
    return(
    <Card className={classes.deptPoolCard}>
      <CardContent>
        <Typography className={classes.deptPoolCardTitle}>{name}</Typography>
        <Typography className={classes.deptPoolCardSubTitle}>{description}</Typography>
        <Grid className={classes.pipeCanvasBackground}>
          <Grid className={classes.pipeCanvasGrid} justifyContent='center'>
            <ResponsivePie
              data={data}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              sortByValue={true}
              activeOuterRadiusOffset={5}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [ [ 'brighter', 1.9 ] ] }}
              startAngle={0}
              enableArcLinkLabels={false}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              enableArcLabels={false}
              arcLabelsRadiusOffset={0}
              colors={{ scheme: 'category10' }}
              arcLabelsTextColor='#000000'
              legends={[]}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    )
}

export default DeptPool

