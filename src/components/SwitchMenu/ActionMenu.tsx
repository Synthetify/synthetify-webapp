import React from 'react'
import SwitchMenu, { IMenuItem } from '@components/SwitchMenu/SwitchMenu'
import { Grid } from '@material-ui/core'

export interface IProps {
  onChange: (newValue: number) => void
  actionContents: IActionContents
  style?: React.CSSProperties
}

export type ActionType = 'mint' | 'deposit' | 'withdraw' | 'burn' | 'rewards'

export type IActionContents = {
  [type in ActionType]: React.ReactNode
}

export const ActionMenu: React.FC<IProps> = ({ onChange, actionContents, style }) => {
  const actions: IMenuItem = { ...actionContents }

  return (
    <Grid style={style}>
      <SwitchMenu menuItems={actions} onChange={onChange} />
    </Grid>
  )
}

export default ActionMenu
