import React from 'react'
import { Grid, CardContent, Card, Button, Paper } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import LinePlot from '@components/LinePlot/LinePlot'
import useStyles from './style'
interface Data {
  id: string
  points: Array<{ x: number; y: number }>
}
interface IProp {
  data: Data[]
}
export const LinePlotContainer: React.FC<IProp> = ({ data }) => {
  const classes = useStyles()
  const [menuOption, setMenuOption] = React.useState('Volume')
  const [dataTmp, setDataTmp] = React.useState<Data>(data[0])
  const changeData = (name: string) => {
    const value = data.findIndex(element => element.id === name)
    setDataTmp(data[value])
  }
  React.useEffect(() => {
    changeData(menuOption.toLowerCase())
    console.log(data[2])
  }, [data])

  return (
    <Card className={classes.diagramCard}>
      <CardContent className={classes.cardContent}>
        <Grid container item className={classes.optionLabel}>
          <Grid container item lg={4} md={4} xs={7} justifyContent='flex-end'></Grid>
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
