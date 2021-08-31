import React from 'react'
import { storiesOf } from '@storybook/react'
import DebtPoolContainer from './DebtPoolContainer'
import { data } from '@containers/DebtPoolContainer/DataChart'

storiesOf('stats/debtPool', module).add('container', () => <DebtPoolContainer data={data}/>)
