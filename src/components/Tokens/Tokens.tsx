import React, { useState, useEffect } from 'react'
import { IToken } from './Item/Item'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import Switch from './Switch/Switch'
import List from './List/List'
import { printBN } from '@consts/utils'
import AnimatedNumber from '@components/AnimatedNumber'
import useStyles, { useStylesWithProps } from './style'
import { theme } from '@static/theme'

export interface IProps {
  synthetic: IToken[]
  staked: IToken[]
  addAccount: () => void
}

export const Tokens: React.FC<IProps> = ({ synthetic, staked, addAccount }) => {
  const classes = useStyles()
  const [current, setCurrent] = useState(0)
  const [sum, setSum] = useState(staked.reduce((acc, token) => acc + +printBN(token.usdValue, token.decimals), 0))
  const proppedClasses = useStylesWithProps({ current })
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

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
        <Switch onChange={(newValue) => setCurrent(newValue)} />
      </Grid>

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
                  value={sum}
                  duration={300}
                  formatValue={(value: string) => {
                    const num = Number(value)

                    if (num < 10) {
                      return num.toFixed(6)
                    }

                    if (num < 1000) {
                      return num.toFixed(4)
                    }

                    if (num < 10000) {
                      return num.toFixed(2)
                    }

                    if (num < 1000000) {
                      return (num / 1000).toFixed(2)
                    }

                    return (num / 1000000).toFixed(2)
                  }}
                />
                {sum >= 10000
                  ? 'K'
                  : (sum >= 1000000 ? 'M' : '')
                }
              </Typography>
            )
            : null
          }
        </Grid>
        <List tokens={current === 0 ? staked : synthetic} type={current === 0 ? 'Staked' : 'Synthetic'} />
      </Grid>
    </>
  )
}

export default Tokens
