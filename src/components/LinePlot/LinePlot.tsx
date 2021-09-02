import React from 'react'
import { Grid, CardContent, Card, ButtonGroup, Button, Paper } from '@material-ui/core'
import { ResponsiveLine } from '@nivo/line'
import { colors } from '@static/theme'
import { linearGradientDef } from '@nivo/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import useStyles from './style'

interface Point {
  x: number
  y: number
}
interface Data {
  id: string
  color: string
  data: Point[]
}

interface IProps {
  data: Data[]
}
export const LinePlot: React.FC<IProps> = ({ data }) => {
  const classes = useStyles()
  const [menuOption, setMenuOption] = React.useState('Volument')

  return (
    <Card className={classes.diagramCard}>
      <CardContent className={classes.cardContent}>
        <Grid container item className={classes.optionLabel}>
          <Grid lg={8} md={8} xs={8} className={classes.selectContainer}>
            <Button
              className={classes.buttonSelect}
              endIcon={React.cloneElement(<ArrowForwardIosIcon className={classes.arrowIcon} />)}
              disableFocusRipple
              disableRipple>
              {menuOption}
              <Paper className={classes.paperMenu}>
                <Grid className={classes.options}>
                  <Button className={classes.optionItem} onClick={() => setMenuOption('Volument')}>
                    Volument
                  </Button>
                  <Button className={classes.optionItem} onClick={() => setMenuOption('Liquidation')}>
                    Liquidation
                  </Button>
                  <Button className={classes.optionItem} onClick={() => setMenuOption('Mint')}>
                    Mint
                  </Button>
                  <Button className={classes.optionItem} onClick={() => setMenuOption('Burn')}>
                    Burn
                  </Button>
                  <Button className={classes.optionItem} onClick={() => setMenuOption('User count')}>
                    User count
                  </Button>
                </Grid>
              </Paper>
            </Button>
          </Grid>
          <Grid container item lg={4} md={4} xs={4} justifyContent='flex-end'>
            <ButtonGroup className={classes.buttonContainer}>
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
            margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
            xScale={{ type: 'linear' }}
            xFormat=' >-'
            curve='monotoneX'
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            colors={colors.green.main}
            enablePoints={false}
            pointColor={{ theme: 'background' }}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.2}
            useMesh={true}
            legends={[]}
            fill={[{ match: { id: 'line' }, id: 'gradient' }]}
            defs={[
              linearGradientDef('gradient', [
                { offset: 0, color: colors.green.main },
                { offset: 100, color: colors.green.main, opacity: 0 }
              ])
            ]}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}
export default LinePlot
