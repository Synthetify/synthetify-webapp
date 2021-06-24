import React from 'react'
import { Grid, Typography, Divider, Button } from '@material-ui/core'
import useStyles from './style'
import AmountInput from '@components/Input/AmountInput'
import { PublicKey } from '@solana/web3.js'
import { Swap } from '@reducers/exchange'
import { TokensWithBalance } from '@selectors/solanaWallet'
import { BN } from '@project-serum/anchor'

export interface IExchangeComponent {
  tokens: TokensWithBalance[]
  swapData: Swap
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
}
export const ExchangeComponent: React.FC<IExchangeComponent> = ({ tokens, swapData, onSwap }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item>
        <Typography className={classes.title}>Swap</Typography>
        <Divider className={classes.titleDivider} />
      </Grid>
      <Grid item className={classes.tokenComponent}>
        <Typography className={classes.tokenComponentText}>From</Typography>
        <Grid container>
          <Grid item>
            <Button>Select a token</Button>
          </Grid>
          <Grid item>
            <AmountInput setValue={() => {}} currency='xUSD' />
          </Grid>
          <Grid item>
            <Button>Set to max</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.tokenComponent}>
        <Typography className={classes.tokenComponentText}>To (Estimate)</Typography>
        <Grid container>
          <Grid item>
            <Button>Select a token</Button>
          </Grid>
          <Grid item>
            <AmountInput setValue={() => {}} currency='xUSD' />
          </Grid>
          <Grid item>
            <Button>Set to max</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.numbers}>
        <Grid item>
          <Typography className={classes.title}>Exchange rate</Typography>
          <Typography className={classes.amount}>{'3.54'}%</Typography>
        </Grid>
        <Grid item>
          <Divider className={classes.amountDivider} orientation='vertical' />
        </Grid>
        <Grid item>
          <Typography className={classes.title}>Fee</Typography>
          <Typography className={classes.amount}>
            {'0.00001'} {'ETH'} per {'GOTEN'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default ExchangeComponent
