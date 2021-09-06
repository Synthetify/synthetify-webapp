import React, { ReactChild } from 'react'
import {
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import HintIcon from '@static/svg/questionMark.svg'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
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
  console.log(Number(value))
  return (
    <Card className={classes.valueCard} onClick={onClick}>
      <CardContent className={classes.cardContent}>
        {hint
          ? (
            <MobileTooltip
              hint={hint}
              anchor={<img src={HintIcon} alt='' className={classes.questionMark} />}
              mobilePlacement='top-end'
              desktopPlacement='top-end'
            />
          )
          : null
        }
        <Typography className={classes.valueCardTitle} style={{ marginBottom: 32 }}>{name}</Typography>
        <Typography className={classes.valueCardAmount}>
          <AnimatedNumber
            value={value}
            duration={300}
            formatValue={(value: string) => {
              const num = Number(value)

              if (num < 10) {
                return num.toFixed(4)
              }

              if (num < 10000) {
                return num.toFixed(2)
              }

              if (num < 1000000) {
                return (num / 1000).toFixed(2)
              }

              return (num / 1000000).toFixed(2)
            }}
          />
          {Number(value) >= 10000
            ? (Number(value) >= 1000000 ? 'M' : 'K')
            : ''
          }
          {sign}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default ValueCard
