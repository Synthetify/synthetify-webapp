import React from 'react'
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Typography
} from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { theme } from '@static/theme'
import useStyle from './style'
import AnimatedNumber from '@components/AnimatedNumber'

export interface Data {
  id: string
  label: string
  value: number
  color: string
  price: number
  percent: number
}

export interface IProps {
  data: Data[]
}
export const LegendDebtPool: React.FC<IProps> = ({ data }) => {
  const classes = useStyle()
  const allCoins: HTMLElement[] = Array.from(document.querySelectorAll('li'))
  const xs = !useMediaQuery(theme.breakpoints.down('xs'))
  const md = !useMediaQuery(theme.breakpoints.down('sm'))

  allCoins.map((coins) => {
    if (coins.offsetHeight >= 53 && xs && !md) {
      allCoins.map((coin) => {
        (coin.childNodes[0].childNodes[2] as HTMLElement).style.flex = '1 0 100%';
        (coin.childNodes[0].childNodes[2] as HTMLElement).style.marginLeft = '-3px'
      })
    } else {
      allCoins.map((coin) => {
        (coin.childNodes[0].childNodes[2] as HTMLElement).style.flex = 'unset';
        (coin.childNodes[0].childNodes[2] as HTMLElement).style.marginLeft = '0'
      })
    }
  })

  data.sort((a, b) => (b.percent - a.percent))

  return (
    <Card className={classes.statsListCard}>
      <CardContent className={classes.statsListCardContent}>
        <Grid container item xs={12} className={classes.listContainer}>
          <List className={classes.legend}>
            {data.map(element => (
              <ListItem key={element.id} className={classes.listItemContainer}>
                <Grid container item id={element.id} className={classes.listItemGrid}>
                  <ListItemIcon
                    className={classes.listItemIconName}
                    style={{ color: element.color }}>
                    <Typography className={classes.titleLabel}>
                      {''}
                      <FiberManualRecordIcon
                        style={{ width: '10px', height: 'auto', paddingRight: '8px' }}
                      />
                      {element.label}{''}
                    </Typography>
                  </ListItemIcon>
                  <Typography className={classes.percentNumber}>{`(${Number(
                    element.percent
                  ).toFixed(2)}%)`}</Typography>
                  <ListItemIcon className={classes.listItemIconNumber}>
                    <FiberManualRecordIcon
                      style={{ width: '10px', height: 'auto' }}
                    />
                    <AnimatedNumber
                      value={element.price}
                      duration={500}
                      formatValue={(value: string) =>
                        Number(value) > 1000000
                          ? Number(Number(value).toFixed(0)).toLocaleString('pl-PL')
                          : Number(value).toLocaleString('pl-PL').replace(',', '.')
                      }
                    />
                    $
                  </ListItemIcon>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LegendDebtPool
