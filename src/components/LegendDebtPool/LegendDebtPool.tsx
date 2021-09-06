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
import NumberFormat from 'react-number-format'
import useStyle from './style'
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
        <Grid container item xs={12} style={{ height: '100%' }}>
          <List className={classes.legend}>
            {data.map(element => (
              <ListItem className={classes.listItemContainer} id={element.id}>
                <Grid container item >
                  <ListItemIcon
                    className={classes.listItemIconName}
                    style={{ color: element.color }}>
                    <FiberManualRecordIcon style={{ width: '8px' }} />
                    <Typography className={classes.titleLabel}> {element.label} </Typography>
                  </ListItemIcon>
                  <Typography
                    className={classes.percentNumber}>{`(${element.percent}%)`}</Typography>
                  <ListItemIcon className={classes.listItemIconNumber}>
                    <FiberManualRecordIcon style={{ width: '8px' }} />
                    <NumberFormat
                      value={element.price}
                      prefix='$'
                      thousandSeparator=' '
                      displayType='text'
                    />
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
