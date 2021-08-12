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

  return (
    <Grid container alignItems='center' className={classes.root}>
      <Grid item style={{ marginRight: 15 }}>
        <Typography className={classes.text}>
          <AnimatedNumber
            value={transformBN(amountToClaim || new BN(0))}
            duration={300}
            formatValue={(value: string) => {
              const num = Number(value)

              if (num < 1000) {
                return num.toFixed(4)
              }

              if (num < 10000) {
                return num.toFixed(3)
              }

              if (num < 1000000) {
                return (num / 1000).toFixed(3)
              }

              return (num / 1000000).toFixed(3)
            }}
          />
          {+transformBN(amountToClaim || new BN(0)) >= 10000
            ? 'K '
            : (+transformBN(amountToClaim || new BN(0)) >= 1000000 ? 'M ' : ' ')
          }
          SNY
        </Typography>
      </Grid>
      <MobileTooltip
        mobilePlacement='bottom-start'
        desktopPlacement='bottom-start'
        hint={(
          <>
            <Typography className={classes.title}>Rewards</Typography>
            Amount of SNY tokens you can withdraw
          </>
        )}
        anchor={<img src={HintIcon} alt='' className={classes.questionMark} />}
        tooltipClassName={classes.tooltip}
      />
    </Grid>
  )
}
