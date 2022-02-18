import { Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { LeverageOption } from '../LeverageOption/LeverageOption'
import { SwitchButton } from '../SwitchButton/SwitchButton'
import { colors } from '@static/theme'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import HintIcon from '@static/svg/questionMark.svg'
import useStyles from './style'
export interface IProps {
  actionContents: IActionContents
  liquidationPriceTo: number
  cRatio: string
  onClickSubmitButton: () => void
  onClickResetButton: () => void
  minCRatio: number
  changeCustomCRatio: (value: string) => void
  currentLeverage: string
  maxLeverage: string
  setLeverageStatus: (value: boolean) => void
  leverageType: string
  blockSubmitButton: boolean
  action: string
  setAction: (value: string) => void
  openCloseLeverage?: () => void
  openCloseModal: boolean
  sending: boolean
  hasError?: boolean
  fee: string
}
export type ActionType = 'open' | 'close'

export type IActionContents = {
  [type in ActionType]: React.ReactNode
}

export const LeverageAction: React.FC<IProps> = ({
  actionContents,
  onClickSubmitButton,
  onClickResetButton,
  minCRatio,
  liquidationPriceTo,
  cRatio,
  changeCustomCRatio,
  currentLeverage,
  setLeverageStatus,
  leverageType,
  blockSubmitButton,
  action,
  setAction,
  openCloseLeverage,
  openCloseModal,
  sending,
  hasError,
  fee
}) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Grid>
        <Grid container justifyContent='space-between' className={classes.header}>
          <SwitchButton
            setLeverStatus={value => {
              if (value) {
                if (openCloseModal) {
                  setAction('close')
                }
              } else {
                setAction('open')
              }
            }}
            firstOption={'open'}
            secondOption={'close'}
            openCloseLeverage={openCloseLeverage}
            openCloseModal={openCloseModal}
          />
          <Grid>
            {' '}
            <MobileTooltip
              hint={
                <>
                  <Typography className={classes.tooltipTitle} style={{ marginBottom: 10 }}>
                    When can you Short and Long?
                  </Typography>
                  <Typography className={classes.tooltipDescription} style={{ marginBottom: 10 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum justo
                    dui, vel gravida mi vulputate et. Nunc luctus hendrerit metus eget convallis.
                    Praesent elementum dignissim tristique. Pellentesque ante eros, venenatis id
                    nisl eu,
                  </Typography>
                </>
              }
              anchor={<img src={HintIcon} alt='' className={classes.questionMark} />}
              mobilePlacement='top-end'
              desktopPlacement='top-end'
            />
          </Grid>
        </Grid>
        <Divider style={{ background: colors.navy.darkGrey }} />
        {actionContents.open}
        {actionContents.close}
      </Grid>

      <LeverageOption
        action={action}
        onClickSubmitButton={onClickSubmitButton}
        onClickResetButton={onClickResetButton}
        minCRatio={minCRatio}
        liquidationPriceTo={liquidationPriceTo}
        cRatio={cRatio}
        changeCustomCRatio={changeCustomCRatio}
        currentLeverage={currentLeverage}
        setLeverageStatus={setLeverageStatus}
        leverageType={leverageType}
        blockSubmitButton={blockSubmitButton}
        sending={sending}
        hasError={hasError}
        fee={fee}
      />
    </Grid>
  )
}
