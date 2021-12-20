import { WrappedBorrow } from '@components/Borrow/WrappedBorrow/WrappedBorrow'
import { Grid, Typography } from '@material-ui/core'
import { BorrowedPair, getAvailableCollateral, getAvailableRepay } from '@selectors/solanaWallet'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/vault'
import useStyles from './style'
import { getGeneralTotals, UserVaults } from '@selectors/exchange'
import { getActualUserVault, vaultSwap } from '@selectors/vault'
interface IProp {
  pairs: BorrowedPair[]
  userVaults: UserVaults[]
}
export const BorrowContainer: React.FC<IProp> = ({ pairs, userVaults }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const vaultSwapData = useSelector(vaultSwap)
  const availableCollateral = useSelector(getAvailableCollateral)
  const availableRepay = useSelector(getAvailableRepay)
  const actualVault = useSelector(getActualUserVault)
  const totalGeneralAmount = useSelector(getGeneralTotals)
  return (
    <Grid className={classes.root}>
      <Typography className={classes.text}>Borrow</Typography>
      <WrappedBorrow
        pairs={pairs}
        userVaults={userVaults}
        sending={vaultSwapData.loading}
        hasError={vaultSwapData.error}
        onClickSubmitButton={(action, synthetic, collateral, collateralAmount, syntheticAmount) => {
          console.log('Amount borrow/repay= (string)', syntheticAmount.toString())
          dispatch(
            actions.setVaultSwap({
              action,
              synthetic,
              collateral,
              collateralAmount,
              syntheticAmount
            })
          )
        }}
        setActualPair={(synthetic, collateral) => {
          dispatch(actions.setActualVaultSwap({ collateral, synthetic }))
        }}
        availableCollateral={availableCollateral}
        availableRepay={availableRepay}
        actualVault={actualVault}
        totalGeneralAmount={totalGeneralAmount}
      />
    </Grid>
  )
}
