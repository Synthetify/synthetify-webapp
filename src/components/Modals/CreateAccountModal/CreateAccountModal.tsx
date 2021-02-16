/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-new */
import React from 'react'
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CircularProgress,
  TextField
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { PublicKey } from '@solana/web3.js'
import CommonButton from '@components/CommonButton/CommonButton'
import useStyles from './style'

export interface ICreateAccountModal {
  open: boolean
  loading: boolean
  handleClose: () => void
  onSend: (tokenAddress: string) => void
  address?: string
}
export interface FormFields {
  tokenAddress: string
}
export const CreateAccountModal: React.FC<ICreateAccountModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  address
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    tokenAddress: yup
      .string()
      .test('is-publicKey', 'Invalid Address', data => {
        try {
          new PublicKey(data)
          return true
        } catch (error) {
          return false
        }
      })
      .required('Provide token address.')
  })
  const { control, errors, formState, reset, handleSubmit } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { tokenAddress: '' },
    shouldFocusError: true
  })

  const clearAndSubmit = (data: FormFields) => {
    onSend(data.tokenAddress)
    reset()
  }
  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>
          <Grid container className={classes.titleWrapper}>
            <AttachMoneyIcon />
            <Typography variant='body1'>{'Create Account'}</Typography>
            <CloseIcon onClick={handleClose} className={classes.close} />
          </Grid>
        </DialogTitle>
        {loading ? (
          <Grid
            container
            className={classes.progressWrapper}
            justify='center'
            direction='column'
            alignItems='center'>
            <CircularProgress size={100} className={classes.progress} />
            <Typography variant='body2'>Sending transactions...</Typography>
          </Grid>
        ) : address ? (
          <Grid
            container
            className={classes.progressWrapper}
            justify='center'
            direction='column'
            alignItems='center'
            wrap='nowrap'>
            <Grid item>
              <CheckCircleOutlineIcon className={classes.successIcon} />
            </Grid>
            <Grid item>
              <Typography variant='body2' className={classes.txid}>
                Account address:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2' className={classes.txid}>
                {address}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <form
            style={{ width: '100%', height: '100%' }}
            onSubmit={e => {
              e.preventDefault()
              handleSubmit(clearAndSubmit)(e)
            }}>
            <Grid
              container
              className={classes.contentWrapper}
              direction='column'
              justify='center'
              alignItems='center'>
              <Grid item className={classes.inputDiv}>
                <Controller
                  as={TextField}
                  helperText={errors.tokenAddress?.message}
                  error={!!errors.tokenAddress?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Token Address'
                  type='text'
                  name='tokenAddress'
                  variant='outlined'
                  control={control}
                />
              </Grid>
              <Grid item>
                <CommonButton
                  disabled={!formState.isValid}
                  name='Create Account'
                  className={classes.button}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Dialog>
    </Grid>
  )
}
export default CreateAccountModal
