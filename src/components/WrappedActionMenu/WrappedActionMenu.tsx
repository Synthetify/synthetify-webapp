import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'
import ActionMenu, { IActionContents } from '@components/SwitchMenu/ActionMenu'
import ActionTemplate from '@components/WrappedActionMenu/ActionTemplate/ActionTemplate'
import { BN } from '@project-serum/anchor'
import { MaxWidthProperty } from 'csstype'
import useStyles from './style'

export interface IProps {
  maxWidth?: MaxWidthProperty<number>
}

export const WrappedActionMenu: React.FC<IProps> = ({ maxWidth }) => {
  const classes = useStyles()

  const actionContents: IActionContents = {
    mint: (
      <ActionTemplate
        action='mint'
        maxAvailable={new BN(198_900_001)}
        maxDecimal={6}
        onClick={() => {}}
      />
    ),
    deposit: (
      <ActionTemplate
        action='deposit'
        maxAvailable={new BN(900_000)}
        maxDecimal={3}
        onClick={() => {}}
      />
    ),
    withdraw: (
      <ActionTemplate
        action='withdraw'
        maxAvailable={new BN(198_900_001)}
        maxDecimal={6}
        onClick={() => {}}
      />
    ),
    burn: (
      <ActionTemplate
        maxAvailable={new BN(198_900_001)}
        maxDecimal={6}
        action='burn'
        onClick={() => {}}
      />
    ),
    rewards: 'TODO'
  }

  return (
    <Card className={classes.card} style={{ maxWidth }}>
      <CardContent className={classes.cardContent}>
        <Grid container justify='space-around' alignItems='flex-start' direction='column'>
          <ActionMenu actionContents={actionContents} onChange={() => {}} />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default WrappedActionMenu
