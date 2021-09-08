import { Card, List, ListItem, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { getCollateralStructure } from './../../store/selectors/exchange'
import useStyles from './style'

export const colors = [
  '#FF9494',
  '#6372BE',
  '#40BFA0',
  '#117098',
  '#BFB665',
  '#1F70CF',
  '#936BC7',
  '#39D3F5',
  '#DADCF1',
  '#C76BA2',
  '#D49347'
]

export const ColStatistics: React.FC = () => {
  const getCollaterals = useSelector(getCollateralStructure)
  const classes = useStyles()
  console.log(getCollaterals)
  const collateralsList: JSX.Element[] = Object.values(getCollaterals).map((item, index) => {
    return <ListItem key={index}
      className={classes.collItem}>
      <Typography component='p'
        style={{ color: colors[index] }}>
        {item.symbol}({(item.percent).toFixed(2)}%)
      </Typography>
    </ListItem>
  })
  return (
    <>
      <Card className={classes.card}>
        <Typography component='h2' className={classes.cardName}>Collateral structure</Typography>
        <Typography component='p' className={classes.cardDesc} style={{ textAlign: 'start' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
        <List classes={{ root: classes.collList }} >
          {collateralsList}
        </List>
      </Card>
    </>
  )
}
