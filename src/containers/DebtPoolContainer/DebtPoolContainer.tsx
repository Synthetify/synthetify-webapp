import { Grid } from '@material-ui/core'
import React from 'react'
import DebtPool from '@components/DebtPool/DebtPool'
import { useSelector } from 'react-redux'
import { getSyntheticsStructure } from '@selectors/exchange'
import { colors } from '@consts/uiUtils'
import DebtPoolLegendTable from '@components/DebtPoolLegendTable/DebtPoolLegendTable'
import useStyles from './style'

export interface Data {
  id: string
  label: string
  color: string
  debt: {
    amount: number
    usdValue: number
  }
  collateral: {
    amount: number
    usdValue: number
  }
}

export const DebtPoolContainer: React.FC = () => {
  const synthetics = useSelector(getSyntheticsStructure)
  const syntheticData: Data[] = Object.values(synthetics).map((item, index) => {
    return {
      id: index.toString(),
      label: item.symbol,
      color: colors[index],
      debt: item.debt,
      collateral: item.collateral
    }
  })
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
      <Grid className={classes.debtcontainer}>
        <DebtPool
          title='Debt pool'
          subTitle='Chart of total debt&apos;s percentage share for each available synthetic asset'
          data={syntheticData}
        />
      </Grid>
      <DebtPoolLegendTable data={syntheticData} />
    </Grid>
  )
}

export default DebtPoolContainer
