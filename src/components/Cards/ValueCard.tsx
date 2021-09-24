import React, { ReactChild } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import HintIcon from '@static/svg/questionMark.svg'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import { showMorK, formatNumbers } from '@consts/utils'
import useStyles from './style'

export interface IProps {
  name: string
  value: string
  sign: string
  hint?: string | ReactChild
  hintTitle?: string
  onClick?: () => void
}
export const ValueCard: React.FC<IProps> = ({ name, value, sign, hint, onClick }) => {
  const classes = useStyles()
  return (
    <Card className={classes.valueCard} onClick={onClick}>
      <CardContent className={classes.cardContent}>
        {hint ? (
          <MobileTooltip
            hint={hint}
            anchor={<img src={HintIcon} alt='' className={classes.questionMark} />}
            mobilePlacement='top-end'
            desktopPlacement='top-end'
          />
        ) : null}
        <Typography className={classes.valueCardTitle} style={{ marginBottom: 28 }}>
          {name}
        </Typography>
        <Typography className={classes.valueCardAmount}>
          <AnimatedNumber
            value={value}
            duration={300}
            formatValue={formatNumbers}
          />
          {showMorK(Number(value))}
          {sign}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default ValueCard
