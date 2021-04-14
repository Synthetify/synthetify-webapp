import React from 'react'
import useStyles from './style'
import { Grid, Typography } from '@material-ui/core'
import CopyToolTip from '@components/CopyToolTip/CopyToolTip'
import { printBN } from '@consts/utils'
import { TokenAccounts } from '@selectors/solanaWallet'

export interface ISendMoneyModal {
  token: TokenAccounts
  backgroundColor: 'dark' | 'light'
}
export const Token: React.FC<ISendMoneyModal> = ({ token, backgroundColor, children }) => {
  const classes = useStyles()
  return (
    <Grid
      item
      xs={12}
      className={backgroundColor === 'light' ? classes.tokenDivLight : classes.tokenDivDark}>
      <Grid container alignItems='center' style={{ flexWrap: 'nowrap' }}>
        <Grid item xs={4}>
          <CopyToolTip text={token.address.toString()}>
            <Typography variant='h6' color='textPrimary' className={classes.field}>
              {token.address.toString()}
            </Typography>
          </CopyToolTip>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction='row'>
            {token.symbol && (
              <Grid item>
                <Typography variant='h5' color='textPrimary' className={classes.tokenName}>
                  {token.symbol}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <CopyToolTip text={token.programId.toString()}>
                <Typography variant='h6' color='textPrimary' className={classes.field}>
                  {token.programId.toString()}
                </Typography>
              </CopyToolTip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.balanceDiv}>
          <Grid container alignItems='center' justify='space-between'>
            <Grid item xs={4}>
              <Typography variant='h5' color='textPrimary' className={classes.balance}>
                {printBN(token.balance, token.decimals)}
              </Typography>
            </Grid>
            <Grid item>{children}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Token
