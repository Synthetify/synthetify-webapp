import { Grid, Typography, SvgIcon } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import CommonButton from '@components/CommonButton/CommonButton'
import BN from 'bn.js'
import { transformBN } from '@consts/utils'
import { TokenAccounts } from '@selectors/solanaWallet'
import Token from '@containers/Tokens/Token/Token'
import { PublicKey } from '@solana/web3.js'
import { ReactComponent as DepositIcon } from '@static/svg/depo_ic.svg'
import { ReactComponent as MintIcon } from '@static/svg/mint_ic.svg'
import { ReactComponent as WithdrawIcon } from '@static/svg/withdraw_ic.svg'
import { openSync } from 'fs'
import UserStatsTile from './UserStatsTile/UserStatsTile'
export interface IStaking {
  stakedValue: BN
  collateralRatio: BN
  debt: BN
  tokens: TokenAccounts[]
  onSend: (address: PublicKey) => void
  onDeposit: () => void
  onMint: () => void
  onWithdraw: () => void
  onBurn: (address: PublicKey) => void
}
export const Stacking: React.FC<IStaking> = ({
  debt,
  collateralRatio,
  stakedValue,
  tokens,
  onDeposit,
  onMint,
  onWithdraw,
  onSend,
  onBurn
}) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container className={classes.statsContainer}>
          <UserStatsTile
            titleText='Staked value'
            titleValueText={`${transformBN(stakedValue)}$`}
          />
          <UserStatsTile
            titleText='Collateral ratio'
            titleValueText={`${collateralRatio.toString()}%`}
          />
          <UserStatsTile
            titleText='Current debt'
            titleValueText={`${transformBN(debt)}$`}
          />
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
                  <Grid
                    item
                    xs
                    className={classes.button}
                    onClick={() => {
                      onDeposit()
                    }}>
                    <Grid
                      container
                      direction='column'
                      justify='center'
                      alignItems='center'
                      style={{ height: '100%' }}>
                      <Grid item>
                        <SvgIcon
                          component={DepositIcon}
                          style={{ width: 80, height: 80 }}
                          viewBox='0 0 220 220'
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant='body1' className={classes.buttonText}>
                          Deposit
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs
                    className={classes.button}
                    style={{ marginLeft: 24 }}
                    onClick={() => {
                      onMint()
                    }}>
                    <Grid
                      container
                      direction='column'
                      justify='center'
                      alignItems='center'
                      style={{ height: '100%' }}>
                      <Grid item>
                        <SvgIcon
                          component={MintIcon}
                          style={{ width: 80, height: 80 }}
                          viewBox='0 0 220 220'
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant='body1' className={classes.buttonText}>
                          Mint
                        </Typography>
                      </Grid>
                    </Grid>
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
                  <Grid
                    item
                    xs
                    className={classes.button}
                    onClick={() => {
                      onWithdraw()
                    }}>
                    <Grid
                      container
                      direction='column'
                      justify='center'
                      alignItems='center'
                      style={{ height: '100%' }}>
                      <Grid item>
                        <SvgIcon
                          component={WithdrawIcon}
                          style={{ width: 80, height: 80 }}
                          viewBox='0 0 220 220'
                        />
                      </Grid>
                      <Grid item>
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
                      onSend(token.programId)
                    }}
                  />
                  <CommonButton
                    name='Burn'
                    onClick={() => {
                      onBurn(token.programId)
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
