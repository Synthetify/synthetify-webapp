import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import CollateralStructureComponent from './CollateralStructureComponent'

storiesOf('ui/CollateralStructureComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ background: '#1B1C2A', padding: 30 }}>
      <CollateralStructureComponent />
    </div>
  ))
