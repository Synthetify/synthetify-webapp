import AnimatedNumber from '@components/AnimatedNumber'
import { printBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { BorrowedPair } from '../WrappedBorrow/WrappedBorrow'
import FlatIcon from '@material-ui/icons/TrendingFlat'
import { colors } from '@static/theme'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive'
import useStyles from './style'
interface IProp {
  pairIndex: number | null
  pairs: BorrowedPair[]
  liquidationPriceTo: number
  liquidationPriceFrom: number
  cRatioFrom: number | string
  cRatioTo: number | string
  minCRatio: number
}
export const BottomInfoGrid: React.FC<IProp> = ({
  pairIndex,
  pairs,
  liquidationPriceFrom,
  liquidationPriceTo,
  cRatioFrom,
  cRatioTo,
  minCRatio
}) => {
  const classes = useStyles()
  return (
    <Grid className={classes.bottomInfo}>
      <Grid>
        {/* {!leverStatus ? ( */}
        <>
          <Typography className={classes.infoTitle}>Interest rate:</Typography>
          <Typography className={classes.infoValueTo}>
            <AnimatedNumber
              value={
                /* eslint-disable @typescript-eslint/indent */
                pairIndex !== null
                  ? Number(
                      printBN(
                        pairs[pairIndex].debtInterestRate.val,
                        pairs[pairIndex].debtInterestRate.scale
                      )
                    ) * 100
                  : 0
              }
              formatValue={(value: number) => value.toFixed(2)}
              duration={300}
            />
            %
          </Typography>
        </>
        {/* ) : (
            <>
              <Typography className={classes.infoTitle}>Leverange:</Typography>
              <FormControl>
                <NativeSelect
                  classes={{ root: classes.selectRoot, icon: classes.selectIcon }}
                  value={leverageLevel}
                  onChange={event => {
                    setLeverageLevel(Number(event.target.value))
                  }}
                  input={<InputBase />}>
                  <option value={1}>1</option>
                  <option value={1.25}>1.25</option>
                  <option value={1.5}>1.5</option>
                  <option value={2}>2</option>
                </NativeSelect>
              </FormControl>
            </>
          )} */}
      </Grid>
      <Grid>
        <Typography className={classes.infoTitle}>Liquidation price:</Typography>

        <Grid container alignItems='center'>
          <Typography className={classes.infoValueFrom}>
            {liquidationPriceFrom.toFixed(3)}$
          </Typography>
          <FlatIcon
            className={classes.flatIcon}
            style={{
              color:
                liquidationPriceFrom >= liquidationPriceTo ? colors.green.button : colors.red.error
            }}
          />
          <Typography className={classes.infoValueTo}>
            <AnimatedNumber
              value={liquidationPriceTo}
              formatValue={(value: number) => value.toFixed(3)}
              duration={300}
            />{' '}
            $
          </Typography>
        </Grid>
      </Grid>
      <Grid>
        <Typography className={classes.infoTitle}>Collateral ratio:</Typography>
        <Grid container alignItems='center'>
          <Grid className={classes.infoValueFrom}>
            <Grid container direction='row' alignItems='center'>
              {cRatioFrom < 9999 ? cRatioFrom : <AllInclusiveIcon style={{ height: '0.75em' }} />}
              {cRatioFrom !== 'NaN' ? '%' : ''}
            </Grid>
          </Grid>
          <FlatIcon
            className={classes.flatIcon}
            style={{
              color:
                Number(cRatioTo === 'NaN' ? minCRatio : cRatioTo) >= Number(cRatioFrom)
                  ? colors.green.button
                  : colors.red.error
            }}
          />
          <Grid className={classes.infoValueTo}>
            <Grid container direction='row' alignItems='center'>
              {cRatioTo < 9999 ? (
                cRatioTo
              ) : (
                <AllInclusiveIcon
                  style={{
                    height: '0.75em',
                    fontWeight: 900,
                    stroke: 'currentcolor',
                    strokeWidth: 1.2
                  }}
                />
              )}
              {cRatioTo !== 'NaN' ? '%' : ''}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
