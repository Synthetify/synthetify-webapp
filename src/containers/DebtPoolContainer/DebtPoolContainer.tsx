import { Grid } from '@material-ui/core'
import React from 'react'
import DebtPool from '@components/DebtPool/DebtPool'
import LegendDebtPool from '@components/LegendDebtPool/LegendDebtPool'
import useStyles from './style'

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

export const DebtPoolContainer: React.FC<IProps> = ({ data }) => {
  const classes = useStyles()
  return (
    <Grid className={classes.container}>
      <Grid className={classes.debtcontainer}>
        <DebtPool
          title='Debt pool'
          subTitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          data={data}
        />
      </Grid>
      <LegendDebtPool data={data} />
    </Grid>
  )
}

export default DebtPoolContainer
