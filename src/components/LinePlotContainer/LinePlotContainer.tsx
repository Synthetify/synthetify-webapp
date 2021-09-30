import React from 'react'
import { Grid, CardContent, Card, Button, Paper, Typography } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import LinePlot from '@components/LinePlot/LinePlot'
import useStyles from './style'
import AnimatedNumber from '@components/AnimatedNumber'
import { formatNumbers, showPrefix } from '@consts/utils'
interface Data {
  id: string
  points: Array<{ x: number; y: number }>
}
interface IProp {
  data: Data[]
  tvlData: {
    value: number
    percent: string
  }
}
export const LinePlotContainer: React.FC<IProp> = ({ data, tvlData }) => {
  const classes = useStyles()
  const [menuOption, setMenuOption] = React.useState('Volume')
  const [dataTmp, setDataTmp] = React.useState<Data>(data[0])
  const changeData = (name: string) => {
    const value = data.findIndex(element => element.id === name)
    if (value === undefined) {
      setDataTmp(data[0])
    } else {
      setDataTmp(data[value])
    }
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
            <Grid className={classes.tvlContainer}>
              <Grid className={classes.tvlTitle}>
                <Typography className={classes.tvlName}>TVL</Typography>
                <Typography
                  className={classes.tvlPercent}
                  style={{
                    ...(+tvlData.percent >= 0 ? { color: '#4BB724' } : { color: '#e31417' })
                  }}>
                  (
                  <AnimatedNumber
                    value={tvlData.percent}
                    formatValue={(value: string) => Number(value).toFixed(2)}
                  />
                  %)
                </Typography>
              </Grid>
              <Typography className={classes.tvlNumber}>
                <AnimatedNumber
                  value={tvlData.value.toString()}
                  duration={300}
                  formatValue={formatNumbers}
                />
                {showPrefix(tvlData.value)}
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
        />
      </CardContent>
    </Card>
  )
}
export default LinePlotContainer
