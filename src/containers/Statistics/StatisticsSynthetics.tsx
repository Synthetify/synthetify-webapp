import React from 'react'
import { DebtPoolContainer } from '../DebtPoolContainer/DebtPoolContainer'
import { useSelector } from 'react-redux'
import { getSyntheticsStructure } from '@selectors/exchange'
import { Container } from '@material-ui/core'

export const StatisticsSynthetic: React.FC = () => {
  const colors = [
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
