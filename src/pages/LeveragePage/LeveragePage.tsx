import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import React from 'react'
import { getUserVaults } from '@selectors/exchange'
import { LeverageContainer } from '@containers/LeverageContainer/LeverageContainer'
import { getLeverageSynthetics, vaultPairs } from '@selectors/solanaWallet'
import useStyles from './style'
export const LeveragePage: React.FC = () => {
  const allSynthetic = useSelector(getLeverageSynthetics)
  const userVaults = useSelector(getUserVaults)
  const pairs = useSelector(vaultPairs)
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <LeverageContainer allSynthetic={allSynthetic} userVaults={userVaults} pairs={pairs} />
    </Grid>
  )
}
