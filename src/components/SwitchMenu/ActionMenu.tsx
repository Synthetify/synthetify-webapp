import React from 'react'
import SwitchMenu, { IMenuItem } from '@components/SwitchMenu/SwitchMenu'

export interface IProps {
  onChange: (newValue: number) => void
  actionContents: IActionContents
}

export interface IActionContents {
  mint: React.ReactNode
  deposit: React.ReactNode
  withdraw: React.ReactNode
  burn: React.ReactNode
  rewards: React.ReactNode
}

export const ActionMenu: React.FC<IProps> = ({ onChange, actionContents }) => {
  const actions: IMenuItem = { ...actionContents }

  return <SwitchMenu menuItems={actions} maxWidth={800} onChange={onChange} />
}

export default ActionMenu
