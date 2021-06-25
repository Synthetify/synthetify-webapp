import React from 'react'
import { Grid, Typography, Divider, Hidden, Box } from '@material-ui/core'
import useStyles from './style'
import AmountInput from '@components/Input/AmountInput'
import { PublicKey } from '@solana/web3.js'
import { Swap } from '@reducers/exchange'
import { TokensWithBalance } from '@selectors/solanaWallet'
import { BN } from '@project-serum/anchor'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import { colors } from '@static/theme'
import MaxButton from '@components/CommonButton/MaxButton'
import SelectToken from '@components/Inputs/SelectToken/SelectToken'

const tokenNames = 'SNY Dogecoin SOL USD FFT ETH 1INCH AAVE AERGO AETH AKRO'.split(' ')

export interface IExchangeComponent {
  tokens: TokensWithBalance[]
  swapData: Swap
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
}
export const ExchangeComponent: React.FC<IExchangeComponent> = ({ tokens, swapData, onSwap }) => {
  const classes = useStyles()

  const [tokenFrom, setTokenFrom] = React.useState<string | null>(null)
  const [tokenTo, setTokenTo] = React.useState<string | null>(null)

  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item>
        <Typography className={classes.title}>Swap</Typography>
        <Divider className={classes.titleDivider} />
      </Grid>

      <Grid item container direction='column' className={classes.tokenComponent}>
        <Typography className={classes.tokenComponentText}>From</Typography>
        <Hidden lgUp>
          <Grid item container justify='space-around' alignItems='center'>
            <Grid item>
              <SelectToken
                tokens={tokenNames}
                current={tokenFrom}
                onSelect={(chosen: string) => setTokenFrom(chosen)}
              />
            </Grid>
            <Grid item>
              <MaxButton name='Set to max' className={classes.button} onClick={() => {}} />
            </Grid>
          </Grid>
        </Hidden>

        <Grid item container justify='space-between' alignItems='center'>
          <Hidden mdDown>
            <Grid item>
              <SelectToken
                tokens={tokenNames}
                current={tokenFrom}
                onSelect={(chosen: string) => setTokenFrom(chosen)}
              />
            </Grid>
          </Hidden>
          <Grid item>
            <AmountInput setValue={() => {}} currency='xUSD' />
          </Grid>
          <Hidden mdDown>
            <Grid item>
              <MaxButton name='Set to max' className={classes.button} onClick={() => {}} />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>

      <Grid item container direction='row' justify='center'>
        <Grid item>
          <Box className={classes.swapIconSquare}>
            <SwapVertIcon style={{ width: 45, height: 45, fill: colors.gray.veryLight }} />
          </Box>
        </Grid>
      </Grid>

      <Grid item container direction='column' className={classes.tokenComponent}>
        <Typography className={classes.tokenComponentText}>To (Estimate)</Typography>
        <Hidden lgUp>
          <Grid item container justify='space-around' alignItems='center'>
            <Grid item>
              <SelectToken
                tokens={tokenNames}
                current={tokenTo}
                onSelect={(chosen: string) => setTokenTo(chosen)}
              />
            </Grid>
            <Grid item>
              <MaxButton name='Set to max' className={classes.button} onClick={() => {}} />
            </Grid>
          </Grid>
        </Hidden>

        <Grid item container justify='space-between' alignItems='center'>
          <Hidden mdDown>
            <Grid item>
              <SelectToken
                tokens={tokenNames}
                current={tokenTo}
                onSelect={(chosen: string) => setTokenTo(chosen)}
              />
            </Grid>
          </Hidden>
          <Grid item>
            <AmountInput setValue={() => {}} currency='xUSD' />
          </Grid>
          <Hidden mdDown>
            <Grid item>
              <MaxButton name='Set to max' className={classes.button} onClick={() => {}} />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>

      <Grid item container className={classes.numbersField}>
        <Grid item>
          <Typography className={classes.numbersFieldTitle}>Exchange rate</Typography>
          <Typography className={classes.numbersFieldAmount}>{'3.54'}%</Typography>
        </Grid>
        <Grid item>
          <Divider className={classes.amountDivider} orientation='vertical' />
        </Grid>
        <Grid item>
          <Typography className={classes.numbersFieldTitle}>Fee</Typography>
          <Typography className={classes.numbersFieldAmount}>
            {'0.00001'} {'ETH'} per {'GOTEN'}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <OutlinedButton name='Swap' color='secondary' className={classes.swapButton} />
      </Grid>
    </Grid>
  )
}
export default ExchangeComponent
