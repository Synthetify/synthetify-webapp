import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import HintIcon from '@static/svg/questionMark.svg'
import { transformBN } from '@consts/utils'
import BN from 'bn.js'
import useStyles from './style'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'

interface IRewardsAmountProps {
  amountToClaim: BN
}

export const RewardsAmount: React.FC<IRewardsAmountProps> = ({ amountToClaim }) => {
  const classes = useStyles()
  const hint = 'Amount of SNY tokens you can withdraw'

  return (
    <Grid container alignItems='center' className={classes.root}>
      <Grid item style={{ marginRight: 15 }}>
        <Typography className={classes.text}>
          <AnimatedNumber
            value={transformBN(amountToClaim || new BN(0))}
            duration={300}
            formatValue={(value: string) => Number(value).toFixed(4)}
          />{' '}
          SNY
        </Typography>
      </Grid>
      <MobileTooltip
        mobilePlacement='bottom-start'
        desktopPlacement='bottom-start'
        hint={hint}
        anchor={<img src={HintIcon} alt='' className={classes.questionMark} />}
        tooltipClassName={classes.tooltip}
      />
    </Grid>
  )
}
