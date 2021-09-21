import React from 'react'
import { Grid, CardContent, Card, ButtonGroup, Button, Paper } from '@material-ui/core'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import LinePlot from '@components/LinePlot/LinePlot'
import { colors } from '@static/theme'

import useStyles from './style'
interface Data {
  id: string
  points: Array<{ x: number; y: number }>
}
interface IProp {
  data: Data[]
  status: boolean
}
export const LinePlotContainer: React.FC<IProp> = ({ data, status }) => {
  const classes = useStyles()
  const [menuOption, setMenuOption] = React.useState('Volume')
  const [activeButtonTime, setActiveButtonTime] = React.useState('Y')
  const [data2, setData2] = React.useState<Data>(data[0])
  const [dataPlot, setDataPlot] = React.useState<Array<{ x: number; y: number }>>(data[0].points)
  // const [status, setStatus] = React.useState(false)
  const changeData = (name: string) => {
    const value = data.findIndex(element => element.id === name)

    setData2(data[value])
  }

  const sortData = (type: string) => {
    const timestamp = Date.now()
    if (type === 'D') {
      setDataPlot(
        data2.points.filter(element => {
          return element.x > timestamp - 86400000
        })
      )
    }
    if (type === 'W') {
      setDataPlot(
        data2.points.filter(element => {
          return element.x > timestamp - 604800000
        })
      )
    }
    if (type === 'M') {
      setDataPlot(
        data2.points.filter(element => {
          return element.x > timestamp - 2629743000
        })
      )
    }
    if (type === 'Y') {
      setDataPlot(
        data2.points.filter(element => {
          return element.x > timestamp - 31556926000
        })
      )
    }
  }

  React.useEffect(() => {
    // if (status) {
    //   setMenuOption('Burn')
    //   changeData('burn')
    //   // setStatus(true)
    // }
    sortData(activeButtonTime)
  }, [activeButtonTime, menuOption, data2])

  React.useEffect(() => {
    if (status) {
      setMenuOption('Burn')
      changeData('burn')
    }
  }, [status])

  return (
    <Card className={classes.diagramCard}>
      <CardContent className={classes.cardContent}>
        <Grid container item className={classes.optionLabel}>
          <Grid item lg={8} md={8} xs={5} className={classes.selectContainer}>
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
                      setMenuOption('Volume')
                      changeData('volume')
                    }}>
                    Volume
                  </Button>
                  <Button
                    className={classes.optionItem}
                    onClick={() => {
                      setMenuOption('Liquidation')
                      changeData('liquidation')
                    }}>
                    Liquidation
                  </Button>
                  <Button
                    className={classes.optionItem}
                    onClick={() => {
                      setMenuOption('Mint')
                      changeData('mint')
                    }}>
                    Mint
                  </Button>
                  <Button
                    className={classes.optionItem}
                    onClick={() => {
                      setMenuOption('Burn')
                      changeData('burn')
                    }}>
                    Burn
                  </Button>
                  <Button
                    className={classes.optionItem}
                    onClick={() => {
                      setMenuOption('User count')
                      changeData('userCount')
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
        <LinePlot data={{ id: data2.id, data: dataPlot }} />
      </CardContent>
    </Card>
  )
}
export default LinePlotContainer
