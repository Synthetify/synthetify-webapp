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
}

enum OptionTime {
  W = 604800000,
  M = 2629743000,
  Y = 31556926000
}
export const LinePlotContainer: React.FC<IProp> = ({ data }) => {
  const classes = useStyles()
  const [menuOption, setMenuOption] = React.useState('Volume')
  const [activeButtonTime, setActiveButtonTime] = React.useState<OptionTime>(OptionTime.Y)
  const [dataTmp, setDataTmp] = React.useState<Data>(data[0])
  const [dataPlot, setDataPlot] = React.useState<Array<{ x: number; y: number }>>(data[0].points)
  const changeData = (name: string) => {
    const value = data.findIndex(element => element.id === name)

    setDataTmp(data[value])
  }

  const sortData = (type: OptionTime) => {
    const timestamp = Date.now()

    setDataPlot(
      dataTmp.points.filter(element => {
        return element.x > timestamp - Number(type)
      })
    )
  }

  React.useEffect(() => {
    sortData(activeButtonTime)
    console.log(dataTmp)
  }, [activeButtonTime, menuOption, dataTmp])

  React.useEffect(() => {
    changeData(menuOption.toLowerCase())
  }, [data])

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
                  ...(activeButtonTime === OptionTime.W
                    ? { color: colors.navy.veryLightGrey }
                    : { color: colors.navy.grey })
                }}
                className={classes.buttonOption}
                onClick={() => setActiveButtonTime(OptionTime.W)}>
                W
              </Button>
              <Button
                style={{
                  ...(activeButtonTime === OptionTime.M
                    ? { color: colors.navy.veryLightGrey }
                    : { color: colors.navy.grey })
                }}
                className={classes.buttonOption}
                onClick={() => setActiveButtonTime(OptionTime.M)}>
                M
              </Button>
              <Button
                style={{
                  ...(activeButtonTime === OptionTime.Y
                    ? { color: colors.navy.veryLightGrey }
                    : { color: colors.navy.grey })
                }}
                className={classes.buttonOption}
                onClick={() => setActiveButtonTime(OptionTime.Y)}>
                Y
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <LinePlot data={{ id: dataTmp.id, data: dataPlot }} />
      </CardContent>
    </Card>
  )
}
export default LinePlotContainer
