/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from 'react'
import { Grid, Typography, Select, MenuItem, CardMedia } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import * as yup from 'yup'

import FilledButton from '@components/FilledButton/FilledButton'
import { useForm, Controller, FieldError } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import useStyles from './style'
import { TokensWithBalance } from '@selectors/solanaWallet'
import { printBNtoBN, printBN } from '@consts/utils'
import { BN } from '@project-serum/anchor'
import { Swap } from '@reducers/exchange'
import { PublicKey } from '@solana/web3.js'
import Loader from '@static/gif/loader.gif'
import Success from '@static/gif/success.gif'
import SwapIcon from '@static/svg/swap.svg'

export interface IExchange {
  tokens: TokensWithBalance[]
  swapData: Swap
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
}
export interface FormFields {
  amount: string
}
export const calculateSwapOutAmount = (
  assetIn: TokensWithBalance,
  assetFor: TokensWithBalance,
  amount: string,
  effectiveFee: number = 300
) => {
  const amountOutBeforeFee = assetIn.price
    .mul(printBNtoBN(amount, assetIn.decimals))
    .div(assetFor.price)
  const decimalChange = 10 ** (assetFor.decimals - assetIn.decimals)
  if (decimalChange < 1) {
    return printBN(
      amountOutBeforeFee
        .sub(amountOutBeforeFee.mul(new BN(effectiveFee)).div(new BN(100000)))
        .div(new BN(1 / decimalChange)),
      assetFor.decimals
    )
  } else {
    return printBN(
      amountOutBeforeFee
        .sub(amountOutBeforeFee.mul(new BN(effectiveFee)).div(new BN(100000)))
        .mul(new BN(decimalChange)),
      assetFor.decimals
    )
  }
}

const getButtonMsg = (
  to: TokensWithBalance | null,
  amountTo: string | null,
  error: FieldError | undefined
) => {
  if (!to) {
    return 'Select output token'
  }
  if (!amountTo) {
    return 'Enter value of swap'
  }
  if (error) {
    return 'Invalid swap amount'
  }
  return 'Swap'
}
const getExchangeRate = (to: TokensWithBalance | null, from: TokensWithBalance | null) => {
  if (!to || !from) {
    return '---'
  }
  return to.price.mul(new BN(1e8)).div(from.price).toNumber() / 1e8
}
export const Exchange: React.FC<IExchange> = ({ tokens, swapData, onSwap }) => {
  const classes = useStyles()
  const [fromToken, setFromToken] = useState<TokensWithBalance | null>(tokens[0] ? tokens[0] : null)
  const [toToken, setToToken] = useState<TokensWithBalance | null>(null)
  const [toAmount, setToAmount] = useState<string | null>(null)
  const schema = yup.object().shape({
    amount: yup.string().test('test-balance', 'Invalid Amount', amount => {
      try {
        if (
          printBNtoBN(amount || '0', fromToken?.decimals || 8).gt(
            fromToken?.balance || new BN(0)
          ) ||
          printBNtoBN(amount || '0', fromToken?.decimals || 8).lte(new BN(0))
        ) {
          return false
        } else {
          return true
        }
      } catch (error) {
        return false
      }
    })
  })
  // useEffect(() => {
  //   setFromToken(tokens[0])
  // }, [tokens.length])
  useEffect(() => {
    if (fromToken) {
      const fromIndex = tokens.findIndex(t => t.assetAddress.equals(fromToken?.assetAddress))
      setFromToken(tokens[fromIndex])
    }
    if (toToken) {
      const toIndex = tokens.findIndex(t => t.assetAddress.equals(toToken?.assetAddress))
      setToToken(tokens[toIndex])
    }
  }, [tokens])
  useEffect(() => {
    if (tokens[0]) {
      setFromToken(tokens[0])
    }
  }, [])
  const { errors, reset, setValue, handleSubmit, register, getValues, trigger } =
    useForm<FormFields>({
      resolver: yupResolver(schema),
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: { amount: '' },
      shouldFocusError: true
    })
  const submit = (data: FormFields) => {
    if (fromToken && toToken) {
      onSwap(
        fromToken.assetAddress,
        toToken.assetAddress,
        printBNtoBN(data.amount, fromToken.decimals)
      )
      setValue('amount', '', {
        shouldValidate: true
      })
      setToAmount('0.00')
    }
    // reset()
  }
  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography variant='h3' color='primary' className={classes.title}>
          Exchange
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ position: 'relative' }}>
        {(swapData.loading || swapData.txid) && (
          <span className={classes.loaderWrapper}>
            {!swapData.txid ? (
              <Grid container justify='center' alignItems='center' direction='column'>
                <Grid item className={classes.loader}>
                  <CardMedia component='img' height='100%' image={Loader} title='Loading wallet' />
                </Grid>
                <Grid item className={classes.titleDiv}>
                  <Typography variant='h1' color='textPrimary'>
                    Transaction in progress
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid container justify='center' alignItems='center' direction='column'>
                <Grid item className={classes.loader}>
                  <CardMedia component='img' height='100%' image={Success} title='Loading wallet' />
                </Grid>
                <Grid item className={classes.titleDiv}>
                  <Typography variant='h1' color='textPrimary'>
                    Transaction successfull
                  </Typography>
                </Grid>
              </Grid>
            )}
          </span>
        )}
        <Grid container className={classes.wrapper}>
          <Grid item>
            <Typography variant='h4' color='primary' className={classes.subTitle}>
              Swap
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.inputDiv}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container justify='space-between'>
                  <Grid item>
                    <Typography variant='body1' className={classes.labels}>
                      From
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body1' className={classes.labels}>
                      {fromToken &&
                        `${printBN(fromToken.balance, fromToken.decimals)} ${fromToken.symbol}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <Grid container justify='space-between'>
                  <Grid item>
                    <input
                      className={classes.input}
                      onChange={e => {
                        if (fromToken && toToken) {
                          setToAmount(calculateSwapOutAmount(fromToken, toToken, e.target.value))
                        }
                      }}
                      placeholder='0.00'
                      name='amount'
                      ref={register}
                    />
                  </Grid>

                  <Grid item>
                    <Grid container alignItems='center'>
                      <Grid item>
                        <FilledButton
                          name='MAX'
                          variant='white'
                          onClick={() => {
                            if (fromToken) {
                              setValue('amount', printBN(fromToken.balance, fromToken.decimals), {
                                shouldValidate: true
                              })
                              if (fromToken && toToken) {
                                setToAmount(
                                  calculateSwapOutAmount(
                                    fromToken,
                                    toToken,
                                    printBN(fromToken.balance, fromToken.decimals)
                                  )
                                )
                              }
                            }
                          }}
                          className={classes.maxButton}></FilledButton>
                      </Grid>
                      <Grid item>
                        <Select
                          value={fromToken?.assetAddress.toString()}
                          onChange={e => {
                            const token = tokens.find(
                              t => t.assetAddress.toString() === e.target.value
                            )
                            setFromToken(token || null)
                            const value = getValues().amount
                            if (value && fromToken && token) {
                              setToAmount(calculateSwapOutAmount(fromToken, token, value))
                            }
                          }}
                          variant='standard'
                          disableUnderline
                          className={classes.tokenInput}
                          IconComponent={KeyboardArrowDownIcon}
                          MenuProps={{ classes: { paper: classes.selectMenu } }}
                          inputProps={{
                            name: 'age',
                            id: 'age-native-simple'
                          }}>
                          {tokens.map(token => {
                            const ticker = token?.symbol?.toString().toLowerCase() || 'xBTC'
                            const image = ticker.startsWith('x') ? ticker.substr(1) : ticker
                            let icon
                            try {
                              icon = require(`@static/icons/${image}.png`)
                            } catch (error) {
                              icon = require(`@static/icons/sny.png`)
                            }
                            return (
                              <MenuItem
                                value={token.assetAddress.toString()}
                                className={classes.menuOption}>
                                <Grid container alignItems='center'>
                                  <Grid item>
                                    <CardMedia
                                      style={{ width: 32, height: 32, marginRight: 10 }}
                                      image={icon}
                                    />
                                  </Grid>
                                  <Grid item> {token.symbol}</Grid>
                                </Grid>
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.middleDiv}>
            <Grid container justify='center' alignItems='center' style={{ height: '100%' }}>
              <Grid
                item
                className={classes.swapIcon}
                onClick={() => {
                  const temp = fromToken
                  setFromToken(toToken)
                  setToToken(temp)
                  setTimeout(() => {
                    if (fromToken && toToken) {
                      const value = getValues().amount
                      setToAmount(calculateSwapOutAmount(toToken, fromToken, value))
                    }
                    trigger()
                  }, 0)
                }}>
                <CardMedia style={{ width: 40, height: 19 }} image={SwapIcon} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.inputDiv}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container justify='space-between'>
                  <Grid item>
                    <Typography variant='body1' className={classes.labels}>
                      To {toAmount && '(Estimate)'}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body1' className={classes.labels}>
                      {toToken && `${printBN(toToken.balance, toToken.decimals)} ${toToken.symbol}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 10, height: 48 }}>
                <Grid container justify='space-between'>
                  <Grid item>
                    <input
                      className={classes.input}
                      placeholder='0.00'
                      value={toAmount || undefined}
                      // name='amount'
                      // ref={register}
                    />
                  </Grid>

                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <Select
                          value={toToken ? toToken?.assetAddress.toString() : 'PLACEHOLDER'}
                          // onChange={handleChange}
                          onChange={e => {
                            const token = tokens.find(
                              t => t.assetAddress.toString() === e.target.value
                            )
                            setToToken(token || null)
                            const value = getValues().amount
                            if (value && fromToken && token) {
                              setToAmount(calculateSwapOutAmount(fromToken, token, value))
                            }
                          }}
                          variant='standard'
                          disableUnderline
                          className={classes.tokenInput}
                          IconComponent={KeyboardArrowDownIcon}
                          MenuProps={{ classes: { paper: classes.selectMenu } }}
                          inputProps={{
                            name: 'age',
                            id: 'age-native-simple'
                          }}>
                          <MenuItem value={'PLACEHOLDER'} className={classes.menuOption}>
                            {'Select token'}
                          </MenuItem>
                          {tokens.map(token => {
                            const ticker = token?.symbol?.toString().toLowerCase() || 'xBTC'
                            const image = ticker.startsWith('x') ? ticker.substr(1) : ticker
                            let icon
                            try {
                              icon = require(`@static/icons/${image}.png`)
                            } catch (error) {
                              icon = require('@static/icons/sny.png')
                            }
                            return (
                              <MenuItem
                                value={token.assetAddress.toString()}
                                className={classes.menuOption}>
                                <Grid container alignItems='center'>
                                  <Grid item>
                                    <CardMedia
                                      style={{ width: 32, height: 32, marginRight: 10 }}
                                      image={icon}
                                    />
                                  </Grid>
                                  <Grid item> {token.symbol}</Grid>
                                </Grid>
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 25 }}>
            <Grid container direction='column'>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Typography className={classes.infoTitle} variant='body1'>
                      Transaction Fee:
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 15 }}>
                    <Typography variant='body1' color='textPrimary'>
                      0.3%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Typography className={classes.infoTitle} variant='body1'>
                      Exchange Rate:
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 15 }}>
                    <Typography variant='body1' color='textPrimary'>
                      {fromToken && toToken
                        ? `${getExchangeRate(
                            toToken,
                            fromToken
                          )} ${fromToken?.symbol?.toString()} per ${toToken?.symbol?.toString()}`
                        : '---'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FilledButton
              name={getButtonMsg(toToken, toAmount, errors.amount)}
              variant='white'
              className={classes.swapButton}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                handleSubmit(submit)()
              }}
              disabled={!toToken || !toAmount || !!errors.amount}></FilledButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Exchange
