import React from 'react'
import { Grid, Typography, Divider, Hidden, Box, IconButton } from '@material-ui/core'
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

interface SymbolAndBalance {
  symbol: string
  balance: BN
}
export interface IExchangeComponent {
  tokens: SymbolAndBalance[]
  swapData: Swap
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
}
export const ExchangeComponent: React.FC<IExchangeComponent> = ({ tokens, swapData, onSwap }) => {
  const classes = useStyles()

  const [tokenFrom, setTokenFrom] = React.useState<SymbolAndBalance | null>(tokens[0] ?? null)
  const [tokenTo, setTokenTo] = React.useState<SymbolAndBalance | null>(null)
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')

  const tokenNames = tokens.map(token => token.symbol)

  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item>
        <Typography className={classes.title}>Swap</Typography>
        <Divider className={classes.titleDivider} />
      </Grid>

      <Grid item container direction='column' className={classes.tokenComponent}>
        <Typography className={classes.tokenComponentText}>From</Typography>
        <Hidden lgUp>
          <Grid item container wrap='nowrap' justify='space-around' alignItems='center'>
            <Grid item>
              <SelectToken
                tokens={tokenNames}
                current={tokenFrom?.symbol ?? null}
                onSelect={(chosen: string) =>
                  setTokenFrom(tokens.find(t => t.symbol === chosen) ?? null)
                }
              />
            </Grid>
            <Grid item>
              <MaxButton
                name='Set to max'
                className={classes.button}
                onClick={() => {
                  if (tokenFrom) {
                    setAmountFrom(tokenFrom.balance.toString())
                  }
                }}
              />
            </Grid>
          </Grid>
        </Hidden>

        <Grid item container wrap='nowrap' justify='space-between' alignItems='center'>
          <Hidden mdDown>
            <Grid item>
              <SelectToken
                tokens={tokenNames}
                current={tokenFrom?.symbol ?? null}
                onSelect={(chosen: string) =>
                  setTokenFrom(tokens.find(t => t.symbol === chosen) ?? null)
                }
              />
            </Grid>
          </Hidden>
          <Grid item>
            <AmountInput
              value={amountFrom}
              setValue={value => setAmountFrom(value)}
              currency={tokenFrom?.symbol ?? null}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item>
              <MaxButton
                name='Set to max'
                className={classes.button}
                onClick={() => {
                  if (tokenFrom) {
                    setAmountFrom(tokenFrom.balance.toString())
                  }
                }}
              />
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
          <Grid item container wrap='nowrap' justify='space-around' alignItems='center'>
            <Grid item>
              <SelectToken
                tokens={tokenNames}
                current={tokenTo?.symbol ?? null}
                onSelect={(chosen: string) =>
                  setTokenTo(tokens.find(t => t.symbol === chosen) ?? null)
                }
              />
            </Grid>
            <Grid item>
              <MaxButton name='Set to max' className={classes.button} onClick={() => {}} />
            </Grid>
          </Grid>
        </Hidden>

        <Grid item container wrap='nowrap' justify='space-between' alignItems='center'>
          <Hidden mdDown>
            <Grid item>
              <SelectToken
                tokens={tokenNames}
                current={tokenTo?.symbol ?? null}
                onSelect={(chosen: string) =>
                  setTokenTo(tokens.find(t => t.symbol === chosen) ?? null)
                }
              />
            </Grid>
          </Hidden>
          <Grid item>
            <AmountInput
              value={amountTo}
              setValue={value => setAmountTo(value)}
              currency={tokenTo?.symbol ?? null}
            />
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
          <Typography className={classes.numbersFieldTitle}>Fee</Typography>
          <Typography className={classes.numbersFieldAmount}>
            {'0.0000'} {tokenFrom?.symbol ?? 'xUSD'} {tokenTo == null ? '' : `per ${tokenTo.symbol}`}
          </Typography>
        </Grid>
        <Grid item>
          <Divider className={classes.amountDivider} orientation='vertical' />
        </Grid>
        <Grid item>
          <Typography className={classes.numbersFieldTitle}>Exchange rate</Typography>
          <Typography className={classes.numbersFieldAmount}>{'3.54'}%</Typography>
        </Grid>
      </Grid>

      <Grid item>
        <OutlinedButton
          name='Swap'
          color='secondary'
          className={classes.swapButton}
          onClick={() => {
            console.log('amountFrom:', amountFrom)
            console.log('amountTo:', amountTo)
            console.log('tokenFrom:', tokenFrom?.balance.toString())
            console.log('tokenTo:', tokenTo)
          }}
        />
      </Grid>
    </Grid>
  )
}
export default ExchangeComponent
