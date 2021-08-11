import React from 'react'
import { IToken, Item } from '../Item/Item'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'

export interface IProps {
  tokens: IToken[]
}

export const List: React.FC<IProps> = ({ tokens }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} style={{ overflowX: 'hidden' }}>
      <Grid container className={classes.header} wrap='nowrap' alignItems='center'>
        <Grid item xs={4}>
          <Typography className={classes.headerFont}>
                Token
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.headerFont}>
                Balance
          </Typography>
        </Grid>
        <Grid item xs={4}>
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
          <Grid className={classes.emptyTokens}>
            <Typography>No tokens to show.</Typography>
            <Typography>Please connect an account.</Typography>
          </Grid>
        )
      }
    </Grid>
  )
}

export default List
