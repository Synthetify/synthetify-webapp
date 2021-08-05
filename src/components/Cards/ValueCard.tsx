import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Divider
} from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import HintIcon from '@static/svg/questionMark.svg'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import useStyles from './style'

export interface IProps {
  name: string
  value: string
  sign: string
  decimals: number
  hint?: string
  onClick?: () => void
}
export const ValueCard: React.FC<IProps> = ({ name, value, sign, decimals, hint, onClick }) => {
  const classes = useStyles()
  return (
    <Card className={classes.valueCard} onClick={onClick}>
      <CardContent>
        {hint
          ? (
            <MobileTooltip
              hint={hint}
              anchor={<img src={HintIcon} alt='' className={classes.questionMark} />}
              tooltipClassName={classes.tooltip}
              tooltipArrowClassName={classes.tooltipArrow}
              mobilePlacement='top-end'
              desktopPlacement='top-end'
            />
          )
          : null
        }
        <Typography className={classes.valueCardTitle}>{name}</Typography>
        <Divider className={classes.divider} />
        <Typography className={classes.valueCardAmount}>
          <AnimatedNumber
            value={value}
            duration={300}
            formatValue={(value: string) => Number(value).toFixed(decimals)}
          />
          {sign}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default ValueCard
