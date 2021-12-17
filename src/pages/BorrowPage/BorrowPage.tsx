import { BorrowContainer } from '@containers/BorrowContainer/BorrowContainer'
import { Grid } from '@material-ui/core'
import { vaultPairs } from '@selectors/solanaWallet'
import { useSelector } from 'react-redux'
import React from 'react'
import { getUserVaults } from '@selectors/exchange'
import useStyles from './style'

export const BorrowPage: React.FC = () => {
  const pairs = useSelector(vaultPairs)
  const userVaults = useSelector(getUserVaults)
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <BorrowContainer pairs={pairs} userVaults={userVaults} />
    </Grid>
  )
}
