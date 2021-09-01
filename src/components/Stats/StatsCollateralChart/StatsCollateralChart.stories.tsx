import React from 'react'
import { storiesOf } from '@storybook/react'
import StatsCollateralChart from '@components/Stats/StatsCollateralChart/StatsCollateralChart'

storiesOf('StatsCollateralChart', module)
  .add('basic', () => <StatsCollateralChart/>)