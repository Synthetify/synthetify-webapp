import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { Grid, CardMedia, IconButton, Divider } from '@material-ui/core'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import useStyles from './style'
import snyIcon from '@static/icons/sny.png'
import NavbarButton from '@components/Navbar/Button'
import HeaderButton from '@components/HeaderButton/HeaderButton'
import DropdownHeaderButton from '@components/HeaderButton/DropdownHeaderButton'
import { MoreHoriz } from '@material-ui/icons'
import PhantomIcon from '@static/png/phantom.png'

export interface IHeader {
  address: PublicKey
  network: string
  typeOfWallet?: 'phantom'
}

export const HeaderRedesign: React.FC<IHeader> = ({ address, network, typeOfWallet = '' }) => {
  const classes = useStyles()

  return (
    <>
      <Grid container spacing={4} className={classes.root} wrap='nowrap' alignItems='center'>
        <CardMedia className={classes.snyLogo} image={snyIcon} />
        <Divider orientation="vertical" className={classes.verticalDivider} />
        <Grid item container spacing={1} wrap='nowrap' alignItems='center' justify='flex-start'>
          <Grid item>
            <NavbarButton name='Staking' onClick={() => {}} />
          </Grid>
          <Grid item>
            <NavbarButton name='Stats' onClick={() => {}} />
          </Grid>
          <Grid item>
            <NavbarButton name='Exchange' onClick={() => {}} />
          </Grid>
        </Grid>
        <Grid container item justify='flex-end' spacing={2} wrap='nowrap' alignItems='center'>
          <Grid item>
            <HeaderButton name={network} />
          </Grid>
          <Grid item>
            {address === DEFAULT_PUBLICKEY ? (
              <HeaderButton name='Connect a wallet' />
            ) : (
              <DropdownHeaderButton
                startIcon={
                  typeOfWallet === 'phantom' ? (
                    <CardMedia
                      style={{ width: 21, height: 21, marginRight: 5 }}
                      image={PhantomIcon}
                    />
                  ) : undefined
                }
                name={address.toString()}
              />
            )}
          </Grid>
          <IconButton className={classes.iconButton} onClick={() => {}}>
            <MoreHoriz fontSize='large' className={classes.dotsIcon} />
          </IconButton>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </>
  )
}
export default HeaderRedesign
