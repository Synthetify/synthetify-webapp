import React, { useState } from 'react'
import { IToken } from './Item/Item'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import Switch from './Switch/Switch'
import List from './List/List'
import { printBN } from '@consts/utils'
import AnimatedNumber from '@components/AnimatedNumber'
import useStyles, { useStylesWithProps } from './style'

export interface IProps {
  synthetic: IToken[]
  staked: IToken[]
  addAccount: () => void
}

export const Tokens: React.FC<IProps> = ({ synthetic, staked, addAccount }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [current, setCurrent] = useState(0)
  const proppedClasses = useStylesWithProps({ current })
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <>
      <Grid item className={classes.switch}>
        <Switch onChange={(newValue) => setCurrent(newValue)} />
      </Grid>

      <Grid container className={classes.wrapper}>
        <Grid container className={classes.list}>
          <Grid
            container
            alignItems='center'
            className={proppedClasses.header}
          >
            <Typography className={classes.title}>
              {current === 0 ? 'Staked tokens' : 'Synthetic assets'}
            </Typography>
            {
              current === 1
                ? (
                  <OutlinedButton
                    name='Add account'
                    className={classes.addAccount}
                    onClick={addAccount}
                  />
                )
                : ''
            }
            {(!isXs || current === 0)
              ? (
                <Typography className={classes.sum}>
                  $ <AnimatedNumber
                    value={
                      current === 0
                        ? staked.reduce((acc, token) => acc + +printBN(token.usdValue, token.decimals), 0)
                        : synthetic.reduce((acc, token) => acc + +printBN(token.usdValue, token.decimals), 0)
                    }
                    duration={300}
                    formatValue={(value: string) => Number(value).toFixed(4)}
                  />
                </Typography>
              )
              : null
            }
          </Grid>
          <List tokens={current === 0 ? staked : synthetic} />
        </Grid>
      </Grid>
    </>
  )
}

export default Tokens
