import React, { useState } from 'react'
import { Button, Drawer, Grid, Typography } from '@material-ui/core'
// import SynthetifyIconHorizontal from '@components/SynthetifyIconHorizontal/SynthetifyIconHorizontal'
import CommonButton from '@components/CommonButton/CommonButton'
import { networkToName, SolanaNetworks } from '@web3/solana/connection'
import BlurOnIcon from '@material-ui/icons/BlurOn'
import useStyles from './style'

export interface IHeader {
  onClickLogo: () => void
  onNetworkClick: (network: SolanaNetworks) => void
  network: SolanaNetworks
}
export const Header: React.FC<IHeader> = ({ onClickLogo, onNetworkClick, network }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Grid container className={classes.root} justify='space-between' alignItems='center'>
        <Grid item>
          {/* <SynthetifyIconHorizontal onClick={onClickLogo} /> */}
          <Typography variant='h3' color='primary' className={classes.title} onClick={onClickLogo}>
            Nebula Wallet
          </Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item className={classes.divButton}>
              <CommonButton
                className={classes.button}
                name={networkToName(network)}
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
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item className={classes.drawerTitleDiv}>
            <Typography variant='body1' color='textPrimary' className={classes.drawerTitle}>
              Select network:
            </Typography>
          </Grid>
          <Grid item className={classes.networkButtonDiv}>
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
          </Grid>
          <Grid item className={classes.networkButtonDiv}>
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
          </Grid>
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
      </Drawer>
    </>
  )
}
export default Header
