import React from 'react'
import SwitchMenu from '@components/SwitchMenu/SwitchMenu'

export interface IProps {
  onChange: (newValue: number) => void
}
export const ActionMenu: React.FC<IProps> = ({ onChange }) => {
  return (
    <SwitchMenu
      items={['Mint', 'Deposit', 'Withdraw', 'Burn', 'Rewards']}
      itemContents={['Mint mock', 'Deposit mock', 'Withdraw mock', 'Burn mock', 'Rewards mock']}
      maxWidth={800}
      onChange={onChange}
    />
  )
}

export default ActionMenu
