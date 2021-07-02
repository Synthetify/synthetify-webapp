/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-new */
import React from 'react'
import { Typography, Grid, CardMedia, Dialog } from '@material-ui/core'

import Loader from '@static/gif/loader.gif'
import Success from '@static/gif/success.gif'
import { PublicKey } from '@solana/web3.js'
import { IAsset } from '@reducers/exchange'

import useStyles from './style'
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
                    Transaction successful
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
              {assets.map((asset, index) => {
                const ticker = asset.symbol.toString().toLowerCase()
                const image = ticker.startsWith('x') ? ticker.substr(1) : ticker
                let icon
                try {
                  icon = require(`@static/icons/${image}.png`)
                } catch (error) {
                  icon = require('@static/icons/sny.png')
                }
                return (
                  <Grid
                    key={index}
                    item
                    className={classes.button}
                    onClick={() => {
                      onSend(asset.assetAddress)
                    }}>
                    <Grid container alignItems='center'>
                      <Grid item style={{ marginLeft: 250 }}>
                        <CardMedia
                          style={{ width: 32, height: 32, marginRight: 30 }}
                          image={icon}
                        />
                      </Grid>
                      <Grid item>{asset.symbol?.toString()}</Grid>
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
