import React from 'react'
import { Card, CardContent, Typography, Divider, Tooltip, Icon } from '@material-ui/core'
import useStyles from './style'
import HintIcon from '@static/svg/questionMarkCircle.svg'

export interface IProps {
  name: string
  value: string
  hint?: string
  onClick?: () => void
}
export const ValueCard: React.FC<IProps> = ({ name, value, hint, onClick }) => {
  const classes = useStyles()
  return (
    <Card className={classes.valueCard} onClick={onClick}>
      <CardContent>
        {hint ? (
          <Icon>
            <Tooltip
              classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
              title={hint}
              placement='top-end'
              arrow>
              <img src={HintIcon} alt='' className={classes.questionMark} />
            </Tooltip>
          </Icon>
        ) : null}
        <Typography className={classes.valueCardTitle}>{name}</Typography>
        <Divider className={classes.divider} />
        <Typography className={classes.valueCardAmount}>{value}</Typography>
      </CardContent>
    </Card>
  )
}
export default ValueCard
