import { storiesOf } from '@storybook/react'
import React from 'react'
import KeyValue from '@components/WrappedActionMenu/KeyValue/KeyValue'
import BN from 'bn.js'
import { colors } from '@static/theme'

storiesOf('WrappedActionMenu/KeyValue', module).add('Available to withdraw', () => (
  <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
    <KeyValue keyName='Available to withdraw' value={new BN(51640189)} decimal={4} unit='xUSD' />
  </div>
))
