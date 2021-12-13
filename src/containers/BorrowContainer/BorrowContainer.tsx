import { WrappedBorrow } from '@components/Borrow/WrappedBorrow/WrappedBorrow'
import { Grid, Typography } from '@material-ui/core'
import { BorrowedPair } from '@selectors/solanaWallet'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/vault'
import useStyles from './style'
import { OwnedVaults } from '@selectors/exchange'
import { vaultSwap } from '@selectors/vault'
interface IProp {
  pairs: BorrowedPair[]
  ownedVaults: OwnedVaults[]
}
export const BorrowContainer: React.FC<IProp> = ({ pairs, ownedVaults }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const vaultSwapData = useSelector(vaultSwap)
  return (
    <Grid className={classes.root}>
      <Typography className={classes.text}>Borrow</Typography>
      <WrappedBorrow
        pairs={pairs}
        ownedVaults={ownedVaults}
        sending={vaultSwapData.loading}
        hasError={vaultSwapData.error}
        debtAmount={0}
        collateralAmount={0}
        addCollateral={(synthetic, collateral, collateralAmount, syntheticAmount) => {
          dispatch(
            actions.setVaultSwapAdded({
              synthetic,
              collateral,
              collateralAmount,
              syntheticAmount

            })
          )
        }}
        borrowSynthetic={(synthetic, collateral, collateralAmount, syntheticAmount) => {
          dispatch(
            actions.setVaultSwapBorrowed({
              synthetic,
              collateral,
              collateralAmount,
              syntheticAmount

            })
          )
        }}
        withdrawCollateral={(synthetic, collateral, collateralAmount, syntheticAmount) => {
          dispatch(
            actions.setVaultSwapWithdraw({
              synthetic,
              collateral,
              collateralAmount,
              syntheticAmount

            })
          )
        }}
        repaySynthetic={(synthetic, collateral, collateralAmount, syntheticAmount) => {
          dispatch(
            actions.setVaultSwapRepay({
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

      />
    </Grid>
  )
}
