import { WrappedBorrow } from '@components/Borrow/WrappedBorrow/WrappedBorrow'
import { Grid, Typography } from '@material-ui/core'
import { BorrowedPair } from '@selectors/solanaWallet'
import React from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '@reducers/exchange'
import useStyles from './style'
interface IProp {
  pairs: BorrowedPair[]
}
export const BorrowContainer: React.FC<IProp> = ({ pairs }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <Grid className={classes.root}>
      <Typography className={classes.text}>Borrow</Typography>
      <WrappedBorrow
        pairs={pairs}
        ownedVaults={[]}
        sending={false}
        hasError={false}
        debtAmount={0}
        collateralAmount={0}
        addCollateral={(synthetic, collateral, collateralAmount, syntheticAmount) => {
          dispatch(
            actions.setVaultSwapAdded({
              synthetic,
              collateral,
              collateralAmount,
              syntheticAmount,
              loading: true
            })
          )
        }}
        borrowSynthetic={() => {
          console.log('borrowSynthetic')
        }}
        withdrawCollateral={() => {
          console.log('withdrawCollateral')
        }}
        repaySynthetic={() => {
          console.log('repaySynthetic')
        }}
      />
    </Grid>
  )
}
