import { BorrowedPair, WrappedBorrow } from '@components/Borrow/WrappedBorrow/WrappedBorrow'
import { Grid, Typography } from '@material-ui/core'
import { getAvailableCollateral, getAvailableRepay, status } from '@selectors/solanaWallet'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/vault'
import { getGeneralTotals, UserVaults } from '@selectors/exchange'
import { getActualUserVault, vaultSwap } from '@selectors/vault'
import { Status } from '@reducers/solanaWallet'
import { actions as snackbarActions } from '@reducers/snackbars'
import useStyles from './style'
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
  const walletStatus = useSelector(status)
  return (
    <Grid className={classes.root}>
      <Typography className={classes.text}>Vaults</Typography>
      <WrappedBorrow
        pairs={pairs}
        userVaults={userVaults}
        sending={vaultSwapData.loading}
        hasError={vaultSwapData.error}
        onClickSubmitButton={(
          action,
          synthetic,
          collateral,
          collateralAmount,
          syntheticAmount,
          vaultType
        ) => {
          dispatch(
            actions.setVaultSwap({
              action,
              synthetic,
              collateral,
              collateralAmount,
              syntheticAmount,
              vaultType
            })
          )
        }}
        setActualPair={(synthetic, collateral, vaultType) => {
          dispatch(actions.setActualVaultSwap({ collateral, synthetic, vaultType }))
        }}
        availableCollateral={availableCollateral}
        availableRepay={availableRepay}
        actualVault={actualVault}
        totalGeneralAmount={totalGeneralAmount}
        walletStatus={walletStatus === Status.Initialized}
        noWalletHandler={() =>
          dispatch(
            snackbarActions.add({
              message: 'Connect your wallet first',
              variant: 'warning',
              persist: false
            })
          )
        }
      />
    </Grid>
  )
}
