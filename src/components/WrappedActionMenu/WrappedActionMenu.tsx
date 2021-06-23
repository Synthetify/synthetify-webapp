import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'
import ActionMenu, { IActionContents } from '@components/SwitchMenu/ActionMenu'
import { MaxWidthProperty } from 'csstype'
import useStyles from './style'
import ActionTemplate from '@components/WrappedActionMenu/ActionTemplate/ActionTemplate'

export interface IProps {
  maxWidth?: MaxWidthProperty<number>
}

export const WrappedActionMenu: React.FC<IProps> = ({ maxWidth }) => {
  const classes = useStyles()

  const actionContents: IActionContents = {
    mint: <ActionTemplate action='mint' onClick={() => {}} />,
    deposit: <ActionTemplate action='deposit' onClick={() => {}} />,
    withdraw: <ActionTemplate action='withdraw' onClick={() => {}} />,
    burn: <ActionTemplate action='burn' onClick={() => {}} />,
    rewards: 'TODO'
  }

  return (
    <Card className={classes.card} style={{ maxWidth }}>
      <CardContent>
        <Grid container justify='space-around' alignItems='flex-start' direction='column'>
          <ActionMenu actionContents={actionContents} onChange={() => {}} />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default WrappedActionMenu
