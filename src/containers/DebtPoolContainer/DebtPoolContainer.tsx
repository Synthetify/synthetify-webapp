import { Grid } from '@material-ui/core'
import React from 'react'
import DebtPool from '@components/DebtPool/DebtPool'
import LegendDebtPool from '@components/LegendDebtPool/LegendDebtPool'
import { useSelector } from 'react-redux'
import { getSyntheticsStructure } from '@selectors/exchange'
import { colors } from '@consts/uiUtils'
import useStyles from './style'

export interface Data {
  id: string
  label: string
  value: number
  color: string
  price: number
  percent: string
}
export interface IProps {
  data: Data[]
}
export const DebtPoolContainer: React.FC = () => {
  const synthetics = useSelector(getSyntheticsStructure)

  const SyntheticData = Object.values(synthetics).map((item, index) => {
    return {
      id: index.toString(),
      label: item.symbol,
      value: item.percent,
      color: colors[index],
      price: item.value,
      percent: item.percent.toFixed(0)
    }
  })
  const classes = useStyles()
  return (
    <Grid className={classes.container}>
      <Grid className={classes.debtcontainer}>
        <DebtPool
          title='Debt pool'
          subTitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          data={SyntheticData}
        />
      </Grid>
      <LegendDebtPool data={SyntheticData} />
    </Grid>
  )
}

export default DebtPoolContainer
