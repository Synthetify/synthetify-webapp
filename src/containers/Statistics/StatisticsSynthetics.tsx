import React from 'react'
import { DebtPoolContainer } from '../DebtPoolContainer/DebtPoolContainer'
import { useSelector } from 'react-redux'
import { getSyntheticsStructure } from '@selectors/exchange'
import { Container } from '@material-ui/core'
import { colors } from '@consts/uiUtils'

export const StatisticsSynthetic: React.FC = () => {
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
  return (
    <Container >
      <DebtPoolContainer data={SyntheticData} />
    </Container>
  )
}
