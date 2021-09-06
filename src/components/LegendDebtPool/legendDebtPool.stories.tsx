import React from 'react'
import { storiesOf } from '@storybook/react'
import LegendDebtPool from './LegendDebtPool'
import { data } from '@containers/DebtPoolContainer/mockData'

storiesOf('stats/debtPool', module).add('legend', () => <LegendDebtPool data={data} />)
