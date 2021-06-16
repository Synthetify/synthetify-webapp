import React from 'react'
import { Grid, CardMedia, IconButton, Divider } from '@material-ui/core'
import { action } from '@storybook/addon-actions'
import useStyles from './style'
import snyIcon from '@static/icons/sny.png'
import NavbarButton from '@components/Navbar/Button'
import HeaderButton from '@components/FilledButton/HeaderButton'
import { MoreHoriz } from '@material-ui/icons'

export interface IHeader {}
export const HeaderRedesign: React.FC<IHeader> = () => {
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
            <HeaderButton name='Mainnet'/>
          </Grid>
          <Grid item>
            <HeaderButton name='Connect a wallet' />
          </Grid>
          <IconButton className={classes.iconButton} onClick={action('more')}>
            <MoreHoriz fontSize='large' className={classes.dotsIcon} />
          </IconButton>
        </Grid>
      </Grid>
      <Divider className={classes.divider}/>
    </>
  )
}
export default HeaderRedesign
