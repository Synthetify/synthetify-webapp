import React from 'react'
import { storiesOf } from '@storybook/react'
import StatsCollateralChart from '@components/Stats/StatsCollateralChart/StatsCollateral'

storiesOf('StatsCollateralChart', module)
  .add('basic', () => <StatsCollateralChart/>)
