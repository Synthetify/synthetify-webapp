/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-new */
import React from 'react'
import { Typography, Grid, Dialog, TextField, InputAdornment, CardMedia } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'

import CommonButton from '@components/CommonButton/CommonButton'
import useStyles from './style'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN } from '@consts/utils'
import FilledButton from '@components/FilledButton/FilledButton'
import Loader from '@static/gif/loader.gif'
import Success from '@static/gif/success.gif'
import { IAsset } from '@reducers/exchange'
import { PublicKey } from '@solana/web3.js'

export interface ICreateAccountModal {
  open: boolean
  loading: boolean
  handleClose: () => void
  onSend: (tokenAddress: PublicKey) => void
  txid?: string
  assets: IAsset[]
}

export const CreateAccountModal: React.FC<ICreateAccountModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  txid,
  assets
}) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose} className={classes.root} keepMounted>
        <Grid
          container
          direction='column'
          alignItems='center'
          justify='center'
          style={{ height: '100%' }}>
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
                    Creating token account.
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
                    Successfully created token account.
                  </Typography>
                </Grid>
              </>
            )
          ) : (
            <>
              {assets.map(asset => {
                const ticker = asset.ticker.toString().toLowerCase()
                const image = ticker.startsWith('x') ? ticker.substr(1) : ticker
                let icon
                try {
                  icon = require(`@static/icons/${image}.png`)
                } catch (error) {
                  icon = require(`@static/icons/sny.png`)
                }
                return (
                  <Grid
                    item
                    className={classes.button}
                    onClick={() => {
                      onSend(asset.address)
                    }}>
                    <Grid container alignItems='center'>
                      <Grid item style={{ marginLeft: 250 }}>
                        <CardMedia
                          style={{ width: 32, height: 32, marginRight: 30 }}
                          image={icon}
                        />
                      </Grid>
                      <Grid item>{asset.ticker.toString()}</Grid>
                    </Grid>
                  </Grid>
                )
              })}
            </>
          )}
        </Grid>
      </Dialog>
    </Grid>
  )
}
export default CreateAccountModal
