import React from 'react'
import {
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
  } from '@material-ui/core'
  import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
  import useStyle from './style'

  export interface Data {
    id: string
    label: string
    value: number
    color: string
    price: number
}

  export interface IProps {
    data: Data[]
  } 
export const LegendDeptPool: React.FC<IProps> = ({data}) => {
const classes = useStyle()
return (
  <Card className={classes.statsListCard}>
    <CardContent className={classes.statsListCardContent}>
      <Grid container item xs={12}>
        <List dense={true}>
          {data.map(element => (
            <ListItem>
              <Grid container item>
                <ListItemIcon
                  className={classes.listItemIconName}
                  style={{ color: element.color }}>
                  <FiberManualRecordIcon style={{ width: '10px' }} />
                  <ListItemText primary={element.label} />
                  
                </ListItemIcon>
                <Typography className={classes.percentNumber}>(10%)</Typography>
                <ListItemIcon className={classes.listItemIconNumber}>
                  <FiberManualRecordIcon style={{ width: '10px' }} />
                  <ListItemText primary={` $  ${element.price}`} />
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

export default LegendDeptPool