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
  landing: string
  typeOfWallet?: 'phantom'
}
export const HeaderRedesign: React.FC<IHeader> = ({
  address,
  network,
  landing,
  typeOfWallet = ''
}) => {
  const classes = useStyles()

  const [activePath, setActive] = React.useState(landing)
  const [selectTokenOpen, setSelectTokenOpen] = React.useState(false)

  return (
    <>
      <Grid container spacing={4} className={classes.root} wrap='nowrap' alignItems='center'>
        <CardMedia className={classes.snyLogo} image={snyIcon} />
        <Divider orientation='vertical' className={classes.verticalDivider} />
        <Grid item container spacing={1} wrap='nowrap' alignItems='center' justify='flex-start'>
          {['staking', 'stats', 'exchange'].map(path => (
            <Grid item>
              <NavbarButton
                name={path}
                onClick={() => {
                  setActive(path)
                }}
                active={path === activePath}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container item justify='flex-end' spacing={2} wrap='nowrap' alignItems='center'>
          <Grid item>
            <HeaderButton name={network} />
          </Grid>
          <Grid item>
            {address === DEFAULT_PUBLICKEY ? (
              <HeaderButton name='Connect a wallet' onClick={() => setSelectTokenOpen(true)} />
            ) : (
              <DropdownHeaderButton
                onClick={() => setSelectTokenOpen(true)}
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
