import React from 'react'
import { storiesOf } from '@storybook/react'
import LegendDebtPool from './LegendDebtPool'
import { data } from '@containers/DebtPoolContainer/DataChart'

storiesOf('stats/debtPool', module).add('legend', () => <LegendDebtPool data={data} />)
