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
  maxLeverage
}) => {
  const actions: IMenuItem = { ...actionContents }

  return (
    <Grid container style={{ borderRadius: '10px 10px' }}>
      <SwitchLeverage menuItems={actions} />
      <LeverageOption
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
