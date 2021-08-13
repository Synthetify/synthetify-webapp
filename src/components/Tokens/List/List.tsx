import React from 'react'
import { IToken, Item } from '../Item/Item'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'

export interface IProps {
  tokens: IToken[]
  type: 'Staked' | 'Synthetic'
}

export const List: React.FC<IProps> = ({ tokens, type }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Grid container className={classes.header} wrap='nowrap' alignItems='center' justifyContent='space-between'>
        <Grid className={classes.column} container item alignItems='center'>
          <Typography className={classes.headerFont}>
                Token
          </Typography>
        </Grid>
        <Grid className={classes.column} container item alignItems='center'>
          <Typography className={classes.headerFont}>
                Balance
          </Typography>
        </Grid>
        <Grid className={classes.column} container item alignItems='center'>
          <Typography className={classes.headerFont}>
                USD value
          </Typography>
        </Grid>
      </Grid>
      {tokens.length > 0
        ? tokens.map((token, index) => (
          <Item key={index} {...token} />
        ))
        : (
          <Grid className={classes.emptyTokens} container direction='column' justifyContent='center'>
            <Typography>No tokens to show.</Typography>
            <Typography>{type === 'Staked' ? 'Please deposit some collaterals.' : 'Please connect an account.'}</Typography>
          </Grid>
        )
      }
    </Grid>
  )
}

export default List
