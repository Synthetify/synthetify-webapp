import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import SolanaIcon from '@static/svg/solana.svg'
import CommonButton from '@components/CommonButton/CommonButton'
import { SolanaNetworks } from '@web3/connection'
import BN from 'bn.js'
import { transformBN } from '@consts/utils'
import { TokenAccounts } from '@selectors/solanaWallet'
import Token from '@containers/Tokens/Token/Token'

export interface IStaking {
  stakedValue: BN
  collateralRatio: BN
  debt: BN
  tokens: TokenAccounts[]
}
export const Stacking: React.FC<IStaking> = ({ debt, collateralRatio, stakedValue, tokens }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.userStats}>
        <Grid container style={{ width: '100%' }}>
          <Grid item xs={4}>
            <Typography variant='h3' className={classes.titleText}>
              Staked value
            </Typography>
            <Typography variant='h2' className={classes.titleValueText}>
              {transformBN(stakedValue)}$
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h3' className={classes.titleText}>
              Collateral ratio
            </Typography>
            <Typography variant='h2' className={classes.titleValueText}>
              {collateralRatio.toString()}%
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h3' className={classes.titleText}>
              Current debt
            </Typography>
            <Typography variant='h2' className={classes.titleValueText}>
              {transformBN(debt)}$
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs>
            <Grid container direction='row'>
              <Grid item>
                <Typography variant='h3' color='primary' className={classes.title}>
                  Stake
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container className={classes.actionsDiv}>
                  <Grid item xs className={classes.button}>
                    <Typography variant='body1' className={classes.buttonText}>
                      Deposit
                    </Typography>
                  </Grid>
                  <Grid item xs className={classes.button} style={{ marginLeft: 33 }}>
                    <Typography variant='body1' className={classes.buttonText}>
                      Mint
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.divider}></Grid>
          <Grid item xs>
            <Grid container direction='row'>
              <Grid item>
                <Typography variant='h3' color='primary' className={classes.title}>
                  Withdraw
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container className={classes.actionsDiv}>
                  <Grid item xs className={classes.button}>
                    <Typography variant='body1' className={classes.buttonText}>
                      Withdraw
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {tokens.length > 0 && (
        <>
          <Grid item>
            <Typography variant='h3' color='primary' className={classes.title}>
              Tokens
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ overflowX: 'hidden' }}>
            <Grid container className={classes.info}>
              <Grid item xs={12} className={classes.headers}>
                <Grid container style={{ flexWrap: 'nowrap' }}>
                  <Grid item xs={4}>
                    <Typography variant='body1' color='textPrimary' className={classes.fieldName}>
                      Account
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='body1' color='textPrimary' className={classes.fieldName}>
                      Token
                    </Typography>
                  </Grid>
                  <Grid item xs className={classes.balanceDiv}>
                    <Typography variant='body1' color='textPrimary' className={classes.fieldName}>
                      Balance
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {tokens.map((token, index) => (
                <Token token={token} backgroundColor={index % 2 === 0 ? 'light' : 'dark'}>
                  <CommonButton
                    name='Send'
                    onClick={() => {
                      // setOpen(true)
                    }}
                  />
                  <CommonButton
                    name='Burn'
                    onClick={() => {
                      // setOpen(true)
                    }}
                    className={classes.burnButton}
                  />
                </Token>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  )
}
export default Stacking
