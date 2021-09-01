import React from 'react'
import {
  Grid,
  CardContent,
  Card,
  FormControl,
  Select,
  MenuItem,
  ButtonGroup,
  Button
} from '@material-ui/core'
import { ResponsiveLine } from '@nivo/line'
import useStyles from './style'
import { linearGradientDef } from '@nivo/core'
export interface Point {
  x: number
  y: number
}
export interface Data {
  id: string
  color: string
  data: Point[]
}

export interface IProps {
  data: Data[]
}
export const LinePlot: React.FC<IProps> = ({ data }) => {
  const classes = useStyles()
  return (
    <Card className={classes.diagramCard}>
      <CardContent className={classes.cardContent}>
        <Grid container item className={ classes.optionLabel}>
          <Grid lg={8} md={8} xs={8}>
            <FormControl className={classes.formControl}>
              <Select className={classes.select}>
                <MenuItem className={classes.menuItem} value='valument'>Valument</MenuItem>
                <MenuItem className={classes.menuItem} value='liquidation'>Liquidation</MenuItem>
                <MenuItem className={classes.menuItem} value='mint'>Mint</MenuItem>
                <MenuItem className={classes.menuItem} value='burn'>Burn</MenuItem>
                <MenuItem className={classes.menuItem} value='userCount'>User count</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item lg={4} md={4} xs={4} justifyContent='center'>
            <ButtonGroup>
              <Button className={classes.buttonOption}>D</Button>
              <Button className={classes.buttonOption}>W</Button>
              <Button className={classes.buttonOption}>M</Button>
              <Button className={classes.buttonOption}>Y</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid className={classes.linePlot} justifyContent='center'>
          <ResponsiveLine
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            xScale={{ type: 'linear' }}
            xFormat=' >-'
            curve='monotoneX'
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            colors='#06b253'
            enablePoints={false}
            pointColor={{ theme: 'background' }}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.1}
            useMesh={true}
            legends={[]}
            fill={[{ match: { id: 'line' }, id: 'gradientA' }]}
            defs={[
              linearGradientDef('gradientA', [
                { offset: 0, color: '#06b253' },
                { offset: 100, color: '#06b253', opacity: 0 }
              ])
            ]}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}
export default LinePlot
