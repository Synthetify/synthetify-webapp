import React from 'react'
import SwitchBorrow, { IMenuItem } from './SwitchBorrow'
export interface IProps {
  actionContents: IActionContents
}

export type ActionType = 'borrow' | 'repay'

export type IActionContents = {
  [type in ActionType]: React.ReactNode
}

export const ActionMenuBorrow: React.FC<IProps> = ({ actionContents }) => {
  const actions: IMenuItem = { ...actionContents }

  return <SwitchBorrow menuItems={actions} />
}

export default ActionMenuBorrow
