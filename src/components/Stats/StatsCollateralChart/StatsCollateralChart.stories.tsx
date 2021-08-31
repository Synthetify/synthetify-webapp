import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import StatsCollateralChart from '@components/Stats/StatsCollateralChart/StatsCollateralChart'

storiesOf('StatsCollateralChart', module)
  .addDecorator(withKnobs)
  .add('basic', () => <StatsCollateralChart/>)
