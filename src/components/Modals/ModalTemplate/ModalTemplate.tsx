/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-new */
import React from 'react'
import { Typography, Grid, Dialog, TextField, InputAdornment, CardMedia } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'

import CommonButton from '#components/CommonButton/CommonButton'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN } from '#consts/utils'
import FilledButton from '#components/FilledButton/FilledButton'
import Loader from '#static/gif/loader.gif'
import Success from '#static/gif/success.gif'
import CloseIcon from '@material-ui/icons/Close'
import useStyles from './style'

export interface ISendMoneyModal {
  open: boolean
  loading: boolean
  title: 'Mint' | 'Withdraw' | 'Deposit' | 'Burn'
  helpText: string
  ticker: string
  handleClose: () => void
  onSend: (amount: BN) => void
  txid?: string
  balance: BN
  decimals?: number
  icon: JSX.Element
  amountSend: BN
}
export interface FormFields {
  amount: string
}
const loadToMsg = (
  title: 'Mint' | 'Withdraw' | 'Deposit' | 'Burn',
  amount: string,
  ticker: string
) => {
  switch (title) {
    case 'Mint':
      return `Minting ${amount} xUSD.`

    case 'Withdraw':
      return `Withdrawing ${amount} SNY from Synthetify Exchange.`

    case 'Deposit':
      return `Depositing ${amount} SNY to Synthetify Exchange.`

    case 'Burn':
      return `Burning ${amount} ${ticker}.`

    default:
      break
  }
}
const doneToMsg = (
  title: 'Mint' | 'Withdraw' | 'Deposit' | 'Burn',
  amount: string,
  ticker: string
) => {
  switch (title) {
    case 'Mint':
      return `Successfully minted ${amount} xUSD.`

    case 'Withdraw':
      return `Successfully withdraw ${amount} SNY from Synthetify Exchange.`

    case 'Deposit':
      return `Successfully deposited ${amount} SNY to Synthetify Exchange.`

    case 'Burn':
      return `Successfully burned ${amount} ${ticker}.`

    default:
      break
  }
}
export const SendMoneyModal: React.FC<ISendMoneyModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  txid,
  balance,
  helpText,
  title,
  ticker,
  icon,
  amountSend,
  decimals = 9
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    amount: yup.string().test('test-balance', 'Invalid Amount', amount => {
      try {
        if (
          printBNtoBN(amount || '0', decimals).gt(balance) ||
          printBNtoBN(amount || '0', decimals).lte(new BN(0))
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
  const { control, errors, reset, setValue, handleSubmit } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { amount: '' },
    shouldFocusError: true
  })

  const clearAndSubmit = (data: FormFields) => {
    onSend(printBNtoBN(data.amount, decimals))
    reset()
  }
  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose} className={classes.root} keepMounted>
        <CloseIcon onClick={handleClose} className={classes.closeIcon} />

        <Grid container direction='column' alignItems='center'>
          {loading || txid ? (
            !txid ? (
              <>
                <Grid item className={classes.loader}>
                  <CardMedia component='img' height='100%' image={Loader} title='Loading wallet' />
                </Grid>
                <Grid item className={classes.titleDiv}>
                  <Typography variant='h1' color='textPrimary'>
                    Transaction in progress
                  </Typography>
                </Grid>
                <Grid item className={classes.helpTextLoaderDiv}>
                  <Typography variant='body1' color='textPrimary'>
                    {loadToMsg(title, printBN(amountSend, decimals), ticker)}
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item className={classes.loader}>
                  <CardMedia component='img' height='100%' image={Success} title='Loading wallet' />
                </Grid>
                <Grid item className={classes.titleDiv}>
                  <Typography variant='h1' color='textPrimary'>
                    Transaction successfull
                  </Typography>
                </Grid>
                <Grid item className={classes.helpTextLoaderDiv}>
                  <Typography variant='body1' color='textPrimary'>
                    {doneToMsg(title, printBN(amountSend, decimals), ticker)}
                  </Typography>
                </Grid>
              </>
            )
          ) : (
            <>
              <Grid item className={classes.iconDiv}>
                {icon}
              </Grid>
              <Grid item className={classes.titleDiv}>
                <Typography variant='h1' color='textPrimary'>
                  {title}
                </Typography>
              </Grid>
              <Grid item className={classes.helpTextDiv} color='textPrimary'>
                <Typography variant='body1' color='textPrimary'>
                  {helpText}
                </Typography>
              </Grid>
              <Grid item className={classes.inputDiv}>
                <Grid container>
                  <Grid item>
                    <Controller
                      as={TextField}
                      helperText={errors.amount?.message}
                      error={!!errors.amount?.message}
                      className={classes.input}
                      defaultValue='0.00'
                      id='amount-field'
                      type='text'
                      name='amount'
                      variant='outlined'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position='end'
                            className={classes.marker}
                            disableTypography>
                            {ticker}
                          </InputAdornment>
                        )
                      }}
                      control={control}
                    />
                  </Grid>
                  <Grid item style={{ marginLeft: 14 }}>
                    <FilledButton
                      name='Set to max'
                      variant='white'
                      onClick={() => {
                        setValue('amount', printBN(balance, decimals), { shouldValidate: true })
                      }}></FilledButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.buttonsDiv}>
                <FilledButton
                  name={title}
                  variant='black'
                  onClick={() => {
                    handleSubmit(clearAndSubmit)()
                  }}></FilledButton>
                <CommonButton
                  name='Cancel'
                  className={classes.closeButton}
                  onClick={() => {
                    handleClose()
                  }}></CommonButton>
              </Grid>
            </>
          )}
        </Grid>
      </Dialog>
    </Grid>
  )
}
export default SendMoneyModal
