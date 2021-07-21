import React from 'react'
import classNames from 'classnames'
import { IToken, TokenItem } from '@components/TokenItem/TokenItem'
import { Grid, Typography, Card, CardContent, Divider } from '@material-ui/core'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import useStyles from './style'

export interface IProps {
  tokens: IToken[]
  addAccount: () => void
}

export const TokenList: React.FC<IProps> = ({ tokens, addAccount }) => {
  const classes = useStyles()
  const items = tokens.map((token, index) => (
    <Grid item key={index}>
      <Divider className={classNames(classes.tokensDivider, classes.tokensDividerMargin)} />
      <TokenItem token={token} />
    </Grid>
  ))

  return (
    <Card className={classes.card}>
      <CardContent style={{ margin: 0, padding: 0 }}>
        <Grid item xs={12} style={{ overflowX: 'hidden' }}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Typography className={classes.ownedTokens}>Owned tokens</Typography>
            </Grid>
            <Grid item>
              <OutlinedButton
                name='Add account'
                fontWeight='normal'
                style={{ fontSize: 17 }}
                onClick={addAccount}
              />
            </Grid>
          </Grid>
          <Grid style={{ marginTop: 15, marginBottom: 15 }}>
            <Divider className={classes.headerDivider} />
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.headerFont}>
              <Grid container style={{ flexWrap: 'nowrap' }}>
                <Grid item xs={4} sm={3}>
                  <Typography variant='body1' color='textPrimary' className={classes.headerFont}>
                    Token
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={5}>
                  <Typography variant='body1' color='textPrimary' className={classes.headerFont}>
                    Balance
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='body1' color='textPrimary' className={classes.headerFont}>
                    USD value
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {items.length > 0
            ? (
            <Grid>{items}</Grid>
              )
            : (
            <Grid>
              <Divider className={classNames(classes.tokensDivider, classes.tokensDividerMargin)} />
              <Grid className={classes.emptyTokens}>
                <Typography>No tokens to show.</Typography>
                <Typography>Please connect an account.</Typography>
              </Grid>
            </Grid>
              )
          }
        </Grid>
      </CardContent>
    </Card>
  )
}
