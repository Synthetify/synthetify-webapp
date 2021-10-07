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
                      {' '}
                      <FiberManualRecordIcon
                        style={{ width: '10px', height: 'auto', paddingRight: '8px' }}
                      />
                      {element.label}{' '}
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