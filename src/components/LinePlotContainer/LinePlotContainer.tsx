import React from 'react'
import { Grid, CardContent, Card, Button, Paper, Typography } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import LinePlot from '@components/LinePlot/LinePlot'
import useStyles from './style'
import AnimatedNumber from '@components/AnimatedNumber'
import { formatNumbers, showPrefix } from '@consts/utils'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
interface Data {
  id: string
  points: Array<{ x: number; y: number }>
}
interface IProp {
  data: Data[]
  infoData: {
    name: string
    value: number
    percent: string
  }
  menuOption: string
  setMenuOption: (value: string) => void
  setTimeActive: (index: number, serieId: string, timestamp: number, value: number) => void
}
export const LinePlotContainer: React.FC<IProp> = ({
  data,
  infoData,
  setTimeActive,
  setMenuOption,
  menuOption
}) => {
  const classes = useStyles()

  const [dataTmp, setDataTmp] = React.useState<Data>(data[0])
  const changeData = (name: string) => {
    const value = data.findIndex(element => element.id === name)
    if (value === undefined) {
      setDataTmp(data[0])
    } else {
      setDataTmp(data[value])
    }
  }
  const formatNumbersUser = (value: string) => {
    const num = Number(value)
    if (num < 10000) {
      return num.toFixed(0)
    }
    if (num < 1000000) {
      return (num / 1000).toFixed(0)
    }
    if (num < 1000000000) {
      return (num / 1000000).toFixed(0)
    }
    return (num / 1000000000).toFixed(0)
  }
  React.useEffect(() => {
    if (menuOption === 'User count') {
      changeData('userCount')
    } else {
      changeData(menuOption.toLowerCase())
    }
  }, [data])
  return (
    <Card className={classes.diagramCard}>
      <CardContent className={classes.cardContent}>
        <Grid className={classes.optionLabel} container item justifyContent='space-between'>
          <Grid>
            <Grid className={classes.infoContainer}>
              <Grid className={classes.infoTitle}>
                <Typography className={classes.infoName}>{infoData.name}</Typography>

                <Typography
                  className={classes.infoPercent}
                  style={{
                    ...(+infoData.percent >= 0 ? { color: '#40BFA0' } : { color: '#C52727' }),
                    display: 'flex',
                    alignContent: 'center'
                  }}>
                  (
                  {+infoData.percent >= 0 ? (
                    <TrendingUpIcon style={{ margin: 0, padding: 0 }} />
                  ) : (
                    <TrendingDownIcon style={{ margin: 0, padding: 0 }} />
                  )}
                  <AnimatedNumber
                    value={infoData.percent}
                    duration={100}
                    formatValue={(value: string) => Math.abs(Number(value)).toFixed(2)}
                  />
                  %)
                </Typography>
              </Grid>
              <Typography className={classes.infoNumber}>
                {menuOption !== 'User count' ? '$' : ''}
                <AnimatedNumber
                  value={infoData.value.toString()}
                  duration={300}
                  formatValue={menuOption !== 'User count' ? formatNumbers : formatNumbersUser}
                />
                {showPrefix(infoData.value)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.selectContainer}>
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
        </Grid>
        <LinePlot
          data={{ id: dataTmp.id, data: dataTmp.points }}
          sign={dataTmp.id === 'userCount' ? '' : '$'}
          setTimeActive={setTimeActive}
        />
      </CardContent>
    </Card>
  )
}
export default LinePlotContainer
