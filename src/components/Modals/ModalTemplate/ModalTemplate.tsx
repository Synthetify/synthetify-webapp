/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-new */
import React from 'react'
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CircularProgress,
  TextField,
  InputAdornment
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'

import NearMeIcon from '@material-ui/icons/NearMe'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { PublicKey } from '@solana/web3.js'
import CommonButton from '@components/CommonButton/CommonButton'
import useStyles from './style'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN } from '@consts/utils'
import FilledButton from '@components/FilledButton/FilledButton'

export interface ISendMoneyModal {
  open: boolean
  loading: boolean
  title: string
  helpText: string
  ticker: string
  handleClose: () => void
  onSend: (amount: BN) => void
  txid?: string
  balance: BN
  decimals?: number
}
export interface FormFields {
  amount: string
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
  decimals = 9
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    amount: yup.string().test('test-balance', 'Invalid Amount', amount => {
      try {
        if (
          printBNtoBN(amount, decimals).gt(balance) ||
          printBNtoBN(amount, decimals).lte(new BN(0))
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
  const { control, errors, formState, reset, setValue, handleSubmit } = useForm<FormFields>({
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
        <Grid container direction='column' alignItems='center'>
          <Grid item className={classes.iconDiv}>
            <Typography variant='h1' color='textPrimary'>
              {title}
            </Typography>
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
                      <InputAdornment position='end' className={classes.marker} disableTypography>
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
              name='Deposit'
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
        </Grid>
      </Dialog>
    </Grid>
  )
}
export default SendMoneyModal
