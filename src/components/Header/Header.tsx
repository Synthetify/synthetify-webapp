import React, { useState } from 'react'
import { Button, Drawer, Grid, Typography, CardMedia } from '@material-ui/core'
// import SynthetifyIconHorizontal from '#components/SynthetifyIconHorizontal/SynthetifyIconHorizontal'
import CommonButton from '#components/CommonButton/CommonButton'
import { SolanaNetworks } from '#web3/connection'
import BlurOnIcon from '@material-ui/icons/BlurOn'
import PhantomIcon from '#static/png/phantom.png'
import SolletIcon from '#static/jpg/sollet.jpg'
import useStyles from './style'
import { WalletType } from '#web3/wallet'
import { DEFAULT_PUBLICKEY } from '#consts/static'
export interface IHeader {
  onNetworkClick: (network: SolanaNetworks) => void
  onConnect: (wallet: WalletType) => void
  address: string
  network: SolanaNetworks
}
export const Header: React.FC<IHeader> = ({ onNetworkClick, network, onConnect, address }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Grid container className={classes.root} wrap='nowrap' justify='flex-end' alignItems='center'>
        <Grid item>
          <Grid container wrap='nowrap'>
            {/* <Grid item className={classes.divAirdropButton}>
              <CommonButton
                className={classes.buttonAirdrop}
                name={'Airdrop'}
                startIcon={<BlurOnIcon style={{ fontSize: 27 }} />}
                onClick={() => {
                  setOpen(true)
                }}></CommonButton>
            </Grid> */}
            <Grid item className={classes.divButton}>
              <CommonButton
                className={
                  address === DEFAULT_PUBLICKEY.toString() ? classes.button : classes.buttonAddress
                }
                name={
                  address === DEFAULT_PUBLICKEY.toString() ? 'Connect' : address.substring(0, 10)
                }
                startIcon={<BlurOnIcon style={{ fontSize: 27 }} />}
                onClick={() => {
                  setOpen(true)
                }}></CommonButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Drawer
        anchor='right'
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        classes={{ paper: classes.drawer }}>
        <Grid
          container
          direction='column'
          justify='space-between'
          wrap='nowrap'
          style={{ height: '100%', paddingBottom: 50, minHeight: 600 }}>
          <Grid item>
            <Grid container direction='column' justify='center' alignItems='center'>
              <Grid item className={classes.drawerTitleDiv}>
                <Typography variant='body1' color='textPrimary' className={classes.drawerTitle}>
                  Connect wallet:
                </Typography>
              </Grid>
              <Grid item className={classes.networkButtonDiv}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    onConnect(WalletType.PHANTOM)
                    setOpen(false)
                  }}
                  className={classes.walletButton}>
                  <Grid container alignItems='center'>
                    <Grid item>
                      <CardMedia
                        style={{ width: 32, height: 32, marginRight: 20 }}
                        image={PhantomIcon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant='h4'>Phantom</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
              <Grid item className={classes.networkButtonDiv}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    onConnect(WalletType.SOLLET)
                    setOpen(false)
                  }}
                  className={classes.walletButton}>
                  <Grid container alignItems='center'>
                    <Grid item>
                      <CardMedia
                        style={{ width: 32, height: 32, marginRight: 20, borderRadius: '50%' }}
                        image={SolletIcon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant='h4'>Sollet</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
              <Grid item className={classes.networkButtonDiv}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    onConnect(WalletType.SOLLET)
                    setOpen(false)
                  }}
                  className={classes.walletButton}>
                  <Grid container alignItems='center' wrap='nowrap'>
                    <Grid item>
                      <CardMedia
                        style={{ width: 32, height: 32, marginRight: 20, borderRadius: '50%' }}
                        image={SolletIcon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant='h4'>Extension</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction='column' justify='center' alignItems='center'>
              <Grid item className={classes.drawerTitleDiv}>
                <Typography variant='body1' color='textPrimary' className={classes.drawerTitle}>
                  Select network:
                </Typography>
              </Grid>
              {/* <Grid item className={classes.networkButtonDiv}>
            <Button
              variant='outlined'
              onClick={() => {
                onNetworkClick(SolanaNetworks.MAIN)
                setOpen(false)
              }}
              className={
                network === SolanaNetworks.MAIN
                  ? classes.networkButton
                  : classes.networkButtonDisabled
              }>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='body2'>Mainnet:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>{SolanaNetworks.MAIN}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid> */}
              {/* <Grid item className={classes.networkButtonDiv}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    onNetworkClick(SolanaNetworks.TEST)
                    setOpen(false)
                  }}
                  className={
                    network === SolanaNetworks.TEST
                      ? classes.networkButton
                      : classes.networkButtonDisabled
                  }>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant='body2'>Testnet:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h6'>{SolanaNetworks.TEST}</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid> */}
              {/* <Grid item className={classes.networkButtonDiv}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    onNetworkClick(SolanaNetworks.LOCAL)
                    setOpen(false)
                  }}
                  className={
                    network === SolanaNetworks.LOCAL
                      ? classes.networkButton
                      : classes.networkButtonDisabled
                  }>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant='body2'>Localnet:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h6'>{SolanaNetworks.LOCAL}</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid> */}
              <Grid item className={classes.networkButtonDiv}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    onNetworkClick(SolanaNetworks.DEV)
                    setOpen(false)
                  }}
                  className={
                    network === SolanaNetworks.DEV
                      ? classes.networkButton
                      : classes.networkButtonDisabled
                  }>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant='body2'>Devnet:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h6'>{SolanaNetworks.DEV}</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </>
  )
}
export default Header
