import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import HintIcon from '@static/svg/questionMark.svg'
import { printBN } from '@consts/utils'
import { BN } from '@project-serum/anchor'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import Rewards from '@static/svg/rewards.svg'
import { colors } from '@static/theme'
import useStyles from './style'

interface IRewardsAmountProps {
  amountToClaim: Decimal
}

export const RewardsAmount: React.FC<IRewardsAmountProps> = ({ amountToClaim }) => {
  const classes = useStyles()

  return (
    <Grid container alignItems='center' className={classes.root} wrap='nowrap'>
      <Typography className={classes.text}>
        <AnimatedNumber
          value={printBN(amountToClaim.val || new BN(0), amountToClaim.scale || 0)}
          duration={300}
          formatValue={(value: string) => {
            const num = Number(value)

            if (num < 10) {
              return num.toFixed(4)
            }

            if (num < 100) {
              return num.toFixed(3)
            }

            if (num < 1000) {
              return num.toFixed(2)
            }

            if (num < 10000) {
              return num.toFixed(1)
            }

            if (num < 1000000) {
              return (num / 1000).toFixed(1)
            }

            return (num / 1000000).toFixed(1)
          }}
        />
        {+printBN(amountToClaim.val || new BN(0), amountToClaim.scale || 0) >= 10000
          ? 'K '
          : +printBN(amountToClaim.val || new BN(0), amountToClaim.scale || 0) >= 1000000
          ? 'M '
          : ' '}
        SNY
      </Typography>
      <MobileTooltip
        mobilePlacement='bottom-start'
        desktopPlacement='bottom-start'
        hint={
          <>
            <img src={Rewards} alt='' className={classes.rewardsIcon} />
            <Typography className={classes.title}>Rewards</Typography>
            <p style={{ margin: 0, color: colors.navy.lightGrey }}>
              Amount of SNY tokens you can withdraw{' '}
            </p>
          </>
        }
        anchor={<img src={HintIcon} alt='' className={classes.questionMark} />}
      />
    </Grid>
  )
}
