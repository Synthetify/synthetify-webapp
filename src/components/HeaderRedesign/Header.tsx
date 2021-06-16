import React from 'react'
import { Grid, CardMedia, IconButton, Divider } from '@material-ui/core'
import { action } from '@storybook/addon-actions'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import useStyles from './style'
import snyIcon from '@static/icons/sny.png'
import NavbarButton from '@components/Navbar/Button'
import HeaderButton from '@components/FilledButton/HeaderButton'
import DropdownHeaderButton from '@components/FilledButton/DropdownHeaderButton'
import { MoreHoriz } from '@material-ui/icons'
import PhantomIcon from '@static/png/phantom.png'

export interface IHeader {
  address: string
  typeOfWallet?: 'phantom'
}

export const HeaderRedesign: React.FC<IHeader> = ({ address, typeOfWallet = '' }) => {
  const classes = useStyles()

  return (
    <>
      <Grid container spacing={4} className={classes.root} wrap='nowrap' alignItems='center'>
        <CardMedia className={classes.snyLogo} image={snyIcon} />
        <Grid item container spacing={1} wrap='nowrap' alignItems='center'>
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
            <HeaderButton name='Mainnet' />
          </Grid>
          <Grid item>
            {address === DEFAULT_PUBLICKEY.toString() ? (
              <HeaderButton name='Connect a wallet' />
            ) : (
              <DropdownHeaderButton
                startIcon={
                  typeOfWallet == 'phantom' ? (
                    <CardMedia
                      style={{ width: 21, height: 21, marginRight: 5 }}
                      image={PhantomIcon}
                    />
                  ) : undefined
                }
                name={address}
              />
            )}
          </Grid>
          <IconButton className={classes.iconButton} onClick={action('more')}>
            <MoreHoriz fontSize='large' className={classes.dotsIcon} />
          </IconButton>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </>
  )
}
export default HeaderRedesign
