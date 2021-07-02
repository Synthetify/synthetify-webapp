import React from 'react'
import { storiesOf } from '@storybook/react'
import { Progress } from '@components/WrappedActionMenu/Progress/Progress'
import { colors } from '@static/theme'
import { Grid } from '@material-ui/core'

storiesOf('WrappedActionMenu/Progress', module)
  .add('progress', () => (
    <div style={{ backgroundColor: colors.gray.background, padding: '10px' }}>
      <Progress state='progress' message='Minting in progress...' />
    </div>
  ))
  .add('success', () => (
    <div style={{ backgroundColor: colors.gray.background, padding: '10px' }}>
      <Progress state='success' message='Successfully minted' />
    </div>
  ))
  .add('failed', () => (
    <div style={{ backgroundColor: colors.gray.background, padding: '10px' }}>
      <Progress state='failed' message='Minting failed' />
    </div>
  ))
  .add('composite', () => (
    <Grid style={{ backgroundColor: colors.gray.background, padding: '10px' }}>
      <Grid>
        <Progress state='progress' message='Minting in progress...' />
      </Grid>
      <Grid>
        <Progress state='success' message='Successfully minted' />
      </Grid>
      <Grid>
        <Progress state='failed' message='Minting failed' />
      </Grid>
    </Grid>
  ))
