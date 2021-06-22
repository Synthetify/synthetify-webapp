import { storiesOf } from '@storybook/react'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import React from 'react'

storiesOf('WrappedActionMenu', module).add('mint mock', () => <WrappedActionMenu maxWidth={850} />)
