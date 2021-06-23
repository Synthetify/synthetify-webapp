import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import RoutesModal from '@components/Modals/RoutesModal/RoutesModal'

const routes = ['staking', 'stats', 'exchange']

storiesOf('modals/routesModal', module)
  .add('default', () => (
    <RoutesModal routes={routes} open={true} handleClose={() => {}} onSelect={(selected: string) => action('chosen: ' + selected)()} />
  ))
