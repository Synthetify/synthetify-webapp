import { storiesOf } from '@storybook/react'
import React from 'react'
import KeyValue from '@components/WrappedActionMenu/KeyValue/KeyValue'
import BN from 'bn.js'

storiesOf('WrappedActionMenu/KeyValue', module).add('Available to withdraw', () => (
  <KeyValue keyName={'Available to withdraw'} value={new BN(51640189)} decimal={4} unit='xUSD' />
))
