import { Grid } from '@material-ui/core'
import React from 'react'
import SwitchLeverage, { IMenuItem } from './SwitchLeverage'
import { LeverageOption } from '../LeverageOption/LeverageOption'

export interface IProps {
  actionContents: IActionContents
  liquidationPriceTo: number
  cRatio: string
  onClickSubmitButton: () => void
  onClickRestartButton: () => void
  minCRatio: number
  changeCustomCRatio: (value: string) => void
  currentLeverage: string
  maxLeverage: string
  switchButton: React.ReactNode
}
export type ActionType = 'open' | 'close'

export type IActionContents = {
  [type in ActionType]: React.ReactNode
}

export const ActionMenuLeverage: React.FC<IProps> = ({
  actionContents,
  onClickSubmitButton,
  onClickRestartButton,
  minCRatio,
  liquidationPriceTo,
  cRatio,
  changeCustomCRatio,
  currentLeverage,
  maxLeverage,
  switchButton
}) => {
  const actions: IMenuItem = { ...actionContents }
  const [action, setAction] = React.useState('open')
  return (
    <Grid
      container
      style={{ borderRadius: '10px 10px', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
      <SwitchLeverage menuItems={actions} switchButton={switchButton} setAction={setAction} />
      <LeverageOption
        action={action}
        onClickSubmitButton={onClickSubmitButton}
        onClickRestartButton={onClickRestartButton}
        minCRatio={minCRatio}
        liquidationPriceTo={liquidationPriceTo}
        cRatio={cRatio}
        changeCustomCRatio={changeCustomCRatio}
        currentLeverage={currentLeverage}
        maxLeverage={maxLeverage}
      />
    </Grid>
  )
}
export default ActionMenuLeverage
