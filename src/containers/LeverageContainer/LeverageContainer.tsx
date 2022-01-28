import { BorrowedPair } from '@components/Borrow/WrappedBorrow/WrappedBorrow'
import { Grid, Typography } from '@material-ui/core'
import {
  getAvailableCollateral,
  getAvailableRepay,
  ILeverageSynthetic,
  status
} from '@selectors/solanaWallet'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/vault'
import { getGeneralTotals, UserVaults } from '@selectors/exchange'
import { getActualUserVault, vaultSwap } from '@selectors/vault'
import { Status } from '@reducers/solanaWallet'
import { actions as snackbarActions } from '@reducers/snackbars'
import { WrappedLeverage } from '@components/Leverage/WrappedLeverage/WrappedLeverage'
import useStyles from './style'
import { long, short } from '@selectors/leverage'

interface IProp {
  allSynthetic: ILeverageSynthetic[]
  pairs: BorrowedPair[]
  userVaults: UserVaults[]
}
export const LeverageContainer: React.FC<IProp> = ({ allSynthetic, userVaults, pairs }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const vaultSwapData = useSelector(vaultSwap)
  const availableCollateral = useSelector(getAvailableCollateral)
  const availableRepay = useSelector(getAvailableRepay)
  const actualVault = useSelector(getActualUserVault)
  const totalGeneralAmount = useSelector(getGeneralTotals)
  const walletStatus = useSelector(status)
  const shortPairs = useSelector(short)
  const longPairs = useSelector(long)
  return (
    <Grid className={classes.root}>
      <Typography className={classes.text}>Leverage</Typography>
      <WrappedLeverage
        allSynthetic={allSynthetic}
        pairs={pairs}
        userVaults={userVaults}
        sending={vaultSwapData.loading}
        hasError={vaultSwapData.error}
        onClickSubmitButton={() => {}}
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
        shortPairs={Object.values(shortPairs)}
        longPairs={Object.values(longPairs)}
      />
    </Grid>
  )
}
