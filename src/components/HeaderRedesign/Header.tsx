import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { Grid, CardMedia, IconButton, Divider, Hidden, Box } from '@material-ui/core'
import useStyles from './style'
import { MoreHoriz, Menu } from '@material-ui/icons'
import PhantomIcon from '@static/svg/phantom.svg'
import SolletIcon from '@static/svg/sollet.svg'
import snyIcon from '@static/icons/sny.png'
import NavbarButton from '@components/Navbar/Button'
import ChangeWalletButton from '@components/HeaderButton/ChangeWalletButton'
import SelectNetworkButton from '@components/HeaderButton/SelectNetworkButton'

export interface IHeader {
  address: PublicKey
  onNetworkSelect: (chosen: string) => void
  onWalletSelect: (chosen: string) => void
  walletConnected: boolean
  landing: string
  typeOfWallet?: 'phantom' | 'sollet'
}
export const HeaderRedesign: React.FC<IHeader> = ({
  address,
  onNetworkSelect,
  onWalletSelect,
  walletConnected,
  landing,
  typeOfWallet = 'phantom'
}) => {
  const classes = useStyles()

  const [activePath, setActive] = React.useState(landing)
  const [network, setNetwork] = React.useState('mainnet')

  return (
    <>
      <Grid container spacing={4} className={classes.root} wrap='nowrap' alignItems='center'>
        <Grid item container wrap='nowrap' alignItems='center'>
          <Grid item>
            <CardMedia className={classes.snyLogo} image={snyIcon} />
          </Grid>
          <Grid item>
            <Divider orientation='vertical' className={classes.verticalDivider} />
          </Grid>
        </Grid>
        <Hidden smDown>
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
        </Hidden>
        <Hidden mdUp>
          <IconButton className={classes.dehazeButton}>
            <Menu className={classes.dehazeIcon}/>
          </IconButton>
        </Hidden>
        <Grid container item justify='flex-end' spacing={2} wrap='nowrap' alignItems='center'>
          <Grid item>
            <SelectNetworkButton
              name={network}
              networks={[
                { name: 'Testnet', network: 'https://api.solana.com/' },
                { name: 'Localnet', network: 'https://127.0.0.1:8898/' }
              ]}
              onSelect={(chosen: string) => {
                onNetworkSelect(chosen)
                setNetwork(chosen)
              }}
            />
          </Grid>
          <Grid item>
            {!walletConnected ? (
              <ChangeWalletButton
                name='Connect a wallet'
                options={['phantom', 'sollet', 'extension']}
                onSelect={onWalletSelect}
                connected={walletConnected}
              />
            ) : (
              <ChangeWalletButton
                name={address.toString()}
                options={['phantom', 'sollet', 'extension']}
                onSelect={onWalletSelect}
                connected={walletConnected}
                startIcon={
                  typeOfWallet === 'phantom' ? (
                    <CardMedia className={classes.connectedWalletIcon} image={PhantomIcon} />
                  ) : (
                    <CardMedia className={classes.connectedWalletIcon} image={SolletIcon} />
                  )
                }
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
