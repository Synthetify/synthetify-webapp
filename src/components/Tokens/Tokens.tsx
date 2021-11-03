import React, { useState, useEffect } from 'react'
import { IToken } from './Item/Item'
import { Grid, Typography } from '@material-ui/core'

import Switch from './Switch/Switch'
import List from './List/List'
import { formatNumbers, printBN, showPrefix } from '@consts/utils'
import AnimatedNumber from '@components/AnimatedNumber'
import useStyles, { useStylesWithProps } from './style'

export interface IProps {
  synthetic: IToken[]
  staked: IToken[]
  addAccount: () => void
}

export const Tokens: React.FC<IProps> = ({ synthetic, staked }) => {
  const classes = useStyles()
  const [current, setCurrent] = useState(0)
  const [sum, setSum] = useState(
    staked.reduce((acc, token) => acc + +printBN(token.usdValue, token.decimals), 0)
  )
  const proppedClasses = useStylesWithProps({ current })

  useEffect(() => {
    setSum(
      current === 0
        ? staked.reduce((acc, token) => acc + +printBN(token.usdValue, token.decimals), 0)
        : synthetic.reduce((acc, token) => acc + +printBN(token.usdValue, token.decimals), 0)
    )
  }, [current, staked, synthetic])

  return (
    <>
      <Grid item className={classes.switch}>
        <Switch onChange={newValue => setCurrent(newValue)} />
      </Grid>

      <Grid container>
        <Grid container alignItems='center' className={proppedClasses.header}>
          <Typography className={classes.title}>
            {current === 0 ? 'Staked tokens' : 'Synthetic assets'}
          </Typography>
          <Typography className={classes.sum}>
              $ <AnimatedNumber value={sum} duration={300} formatValue={formatNumbers} />
            {showPrefix(sum)}
          </Typography>
        </Grid>
        <List
          tokens={current === 0 ? staked : synthetic}
          type={current === 0 ? 'Staked' : 'Synthetic'}
        />
      </Grid>
    </>
  )
}

export default Tokens
