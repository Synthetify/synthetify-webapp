import React from 'react'
import { Grid, CardContent, Card, ButtonGroup, Button, Paper } from '@material-ui/core'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import LinePlot from '@components/LinePlot/LinePlot'
import { data as mockData } from './mockData'
import { colors } from '@static/theme'

import useStyles from './style'
interface Data {
  id: string
  data: Array<{ x: number; y: number }>
}

export const LinePlotContainer: React.FC = () => {
  const classes = useStyles()
  const [menuOption, setMenuOption] = React.useState('Volument')
  const [activeButtonTime, setActiveButtonTime] = React.useState('Y')
  const [data, setData] = React.useState<Data>(mockData[0])
  const [dataPlot, setDataPlot] = React.useState<Array<{ x: number; y: number }>>(
    mockData[0].data.sort((a: { x: number; y: number }, b: { x: number; y: number }) => {
      return a.x - b.x
    })
  )
  const changeData = (name: string) => {
    const value = mockData.findIndex(element => element.id === name)

    setData(mockData[value])
  }

  const sortData = (type: string) => {
    const timestamp = Date.now()
    if (type === 'D') {
      setDataPlot(
        data.data.filter(element => {
          return element.x > timestamp - 86400000
        })
      )
    }
    if (type === 'W') {
      console.log(timestamp)
      setDataPlot(
        data.data.filter(element => {
          return element.x > timestamp - 604800000
        })
      )
    }
    if (type === 'M') {
      setDataPlot(
        data.data.filter(element => {
          return element.x > timestamp - 2629743000
        })
      )
    }
    if (type === 'Y') {
      setDataPlot(
        data.data.filter(element => {
          return element.x > timestamp - 31556926000
        })
      )
    }
  }

  React.useEffect(() => {
    sortData(activeButtonTime)
  }, [activeButtonTime, data.data])

  return (
    <Card className={classes.diagramCard}>
      <CardContent className={classes.cardContent}>
        <Grid container item className={classes.optionLabel}>
          <Grid lg={8} md={8} xs={5} className={classes.selectContainer}>
            <Grid className={classes.hoverGrid}>
              <Button
                className={classes.buttonSelect}
                endIcon={React.cloneElement(<ArrowForwardIosIcon className={classes.arrowIcon} />)}
                disableFocusRipple
                disableRipple>
                {menuOption}
              </Button>
              <Paper className={classes.paperMenu}>
                <Grid className={classes.options}>
                  <Button
                    className={classes.optionItem}
                    onClick={() => {
                      setMenuOption('Volument')
                      changeData('Volument')
                    }}>
                    Volument
                  </Button>
                  <Button
                    className={classes.optionItem}
                    onClick={() => {
                      setMenuOption('Liquidation')
                      changeData('Liquidation')
                    }}>
                    Liquidation
                  </Button>
                  <Button
                    className={classes.optionItem}
                    onClick={() => {
                      setMenuOption('Mint')
                      changeData('Mint')
                    }}>
                    Mint
                  </Button>
                  <Button
                    className={classes.optionItem}
                    onClick={() => {
                      setMenuOption('Burn')
                      changeData('Burn')
                    }}>
                    Burn
                  </Button>
                  <Button
                    className={classes.optionItem}
                    onClick={() => {
                      setMenuOption('User count')
                      changeData('User count')
                    }}>
                    User count
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid container item lg={4} md={4} xs={7} justifyContent='flex-end'>
            <ButtonGroup className={classes.buttonContainer}>
              <Button
                style={{
                  ...(activeButtonTime === 'D'
                    ? { color: colors.navy.veryLightGrey }
                    : { color: colors.navy.grey })
                }}
                className={classes.buttonOption}
                onClick={() => setActiveButtonTime('D')}>
                D
              </Button>
              <Button
                style={{
                  ...(activeButtonTime === 'W'
                    ? { color: colors.navy.veryLightGrey }
                    : { color: colors.navy.grey })
                }}
                className={classes.buttonOption}
                onClick={() => setActiveButtonTime('W')}>
                W
              </Button>
              <Button
                style={{
                  ...(activeButtonTime === 'M'
                    ? { color: colors.navy.veryLightGrey }
                    : { color: colors.navy.grey })
                }}
                className={classes.buttonOption}
                onClick={() => setActiveButtonTime('M')}>
                M
              </Button>
              <Button
                style={{
                  ...(activeButtonTime === 'Y'
                    ? { color: colors.navy.veryLightGrey }
                    : { color: colors.navy.grey })
                }}
                className={classes.buttonOption}
                onClick={() => setActiveButtonTime('Y')}>
                Y
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <LinePlot data={{ id: data.id, data: dataPlot }} />
      </CardContent>
    </Card>
  )
}
export default LinePlotContainer
