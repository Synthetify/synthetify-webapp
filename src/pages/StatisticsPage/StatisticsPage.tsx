import React from 'react'
import { Statistics } from './../../containers/Statistics/Statistics'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

export const StatisticsPage: React.FC<IProps> = () => {
  return (
    <>
      <Statistics />
    </>
  )
}
