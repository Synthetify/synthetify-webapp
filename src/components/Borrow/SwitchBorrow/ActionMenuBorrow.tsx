import React from 'react'
import SwitchBorrow, { IMenuItem } from './SwitchBorrow'
export interface IProps {
  onChange: (newValue: number) => void
  actionContents: IActionContents
}

export type ActionType = 'borrow' | 'repay'

export type IActionContents = {
  [type in ActionType]: React.ReactNode
}

export const ActionMenu: React.FC<IProps> = ({ onChange, actionContents }) => {
  const actions: IMenuItem = { ...actionContents }

  return <SwitchBorrow menuItems={actions} onChange={onChange} />
}

export default ActionMenu
