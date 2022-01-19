import { Grid } from '@material-ui/core'
import React from 'react'
import SwitchBorrow, { IMenuItem } from './SwitchBorrow'
import { colors } from '@static/theme'
export interface IProps {
  actionContents: IActionContents
  SwitchLeverage: React.ReactNode
}
export type ActionType = 'borrow' | 'repay'

export type IActionContents = {
  [type in ActionType]: React.ReactNode
}

export const ActionMenuBorrow: React.FC<IProps> = ({ actionContents, SwitchLeverage }) => {
  const actions: IMenuItem = { ...actionContents }

  return (
    <Grid style={{ background: colors.navy.component, borderRadius: '10px 10px' }}>
      <SwitchBorrow menuItems={actions} SwitchLeverage={SwitchLeverage} />
    </Grid>
  )
}
export default ActionMenuBorrow
