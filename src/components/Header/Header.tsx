import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { Grid, CardMedia, IconButton, Divider, Hidden, Button, useMediaQuery } from '@material-ui/core'
import { MoreHoriz, Menu } from '@material-ui/icons'
import PhantomIcon from '@static/svg/phantom.svg'
import SolletIcon from '@static/svg/sollet.svg'
import snyIcon from '@static/svg/logo-ic-nav.svg'
import NavbarButton from '@components/Navbar/Button'
import ChangeWalletButton from '@components/HeaderButton/ChangeWalletButton'
import SelectNetworkButton from '@components/HeaderButton/SelectNetworkButton'
import RoutesModal from '@components/Modals/RoutesModal/RoutesModal'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { SolanaNetworks } from '@consts/static'
import { Link } from 'react-router-dom'
import { WalletType } from '@web3/wallet'
import { theme } from '@static/theme'
import useButtonStyles from '../HeaderButton/style'
import useStyles from './style'

export interface IHeader {
  address: PublicKey
  onNetworkSelect: (chosen: string) => void
  onWalletSelect: (chosen: WalletType) => void
  walletConnected: boolean
  landing: string
  typeOfWallet?: 'phantom' | 'sollet'
  onFaucet?: () => void
  onDisconnectWallet: () => void
}
export const Header: React.FC<IHeader> = ({
  address,
  onNetworkSelect,
  onWalletSelect,
  walletConnected,
  landing,
  typeOfWallet = 'phantom',
  onFaucet,
  onDisconnectWallet
}) => {
  const classes = useStyles()
  const buttonClasses = useButtonStyles()

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  const routes = ['staking', 'exchange']
  const [activePath, setActive] = React.useState(landing)
  const [network, setNetwork] = React.useState('Devnet')

  const [routesModalOpen, setRoutesModalOpen] = React.useState(false)
  const [routesModalAnchor, setRoutesModalAnchor] = React.useState<HTMLButtonElement | null>(null)

  React.useEffect(() => { // if there will be no redirects, get rid of this
    setActive(landing)
  }, [landing])

  return (
    <>
      <Grid container className={classes.root} wrap='nowrap' alignItems='center'>
        <Grid item container className={classes.left} wrap='nowrap' alignItems='center'>
          <CardMedia className={classes.snyLogo} image={snyIcon} />
          <Divider orientation='vertical' className={classes.verticalDivider} />
        </Grid>
        <Hidden smDown>
          <Grid container wrap='nowrap' alignItems='center' style={{ maxWidth: (93 * routes.length) + (15 * (routes.length - 1)) }}>
            {routes.map(path => (
              <Link key={`path-${path}`} to={`/${path}`} className={classes.link}>
                <NavbarButton
                  name={path}
                  onClick={() => {
                    setActive(path)
                  }}
                  active={path === activePath}
                />
              </Link>
            ))}
          </Grid>
        </Hidden>

        <Grid container item className={classes.buttons} wrap='nowrap' alignItems='center'>
          {(network === 'Devnet') && (
            <Button
              className={buttonClasses.headerButton}
              variant='contained'
              classes={{ disabled: buttonClasses.disabled }}
              onClick={onFaucet}
            >
                Faucet
            </Button>
          )}
          <SelectNetworkButton
            name={network}
            networks={[
              { name: 'Devnet', network: SolanaNetworks.DEV }
            ]}
            onSelect={(chosen: string) => {
              onNetworkSelect(chosen)
              setNetwork(chosen)
            }}
          />
          {!walletConnected
            ? (
              <ChangeWalletButton
                name={isSmDown ? 'My wallet' : 'Connect'}
                options={[WalletType.PHANTOM, WalletType.SOLLET]}
                onSelect={onWalletSelect}
                connected={walletConnected}
                onDisconnect={onDisconnectWallet}
                hideArrow={isSmDown}
              />
            )
            : (
              <ChangeWalletButton
                name={`${address.toString().substr(0, isSmDown ? 2 : 6)}...${address.toString().substr(address.toString().length - (isSmDown ? 2 : 3), isSmDown ? 2 : 3)}`}
                options={[WalletType.PHANTOM, WalletType.SOLLET]}
                onSelect={onWalletSelect}
                connected={walletConnected}
                hideArrow={isSmDown}
                onDisconnect={onDisconnectWallet}
                startIcon={
                  typeOfWallet === 'phantom'
                    ? (
                      <CardMedia className={classes.connectedWalletIcon} image={PhantomIcon} />
                    )
                    : (
                      <CardMedia className={classes.connectedWalletIcon} image={SolletIcon} />
                    )
                }
              />
            )}
        </Grid>
        <Hidden smDown>
          <Grid item container className={classes.right} wrap='nowrap' alignItems='center'>
            <Divider orientation='vertical' className={classes.verticalDivider} />
            <IconButton className={classes.dotsButton} onClick={() => {}}>
              <MoreHoriz fontSize='large' className={classes.dehazeIcon} />
            </IconButton>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item container className={classes.mobileRight} wrap='nowrap' alignItems='center'>
            <Divider orientation='vertical' className={classes.verticalDivider} />
            <IconButton
              className={classes.dehazeButton}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                setRoutesModalAnchor(event.currentTarget)
                setRoutesModalOpen(true)
                blurContent()
              }}>
              <Menu className={classes.dehazeIcon} />
            </IconButton>
            <RoutesModal
              routes={routes}
              anchorEl={routesModalAnchor}
              open={routesModalOpen}
              current={activePath}
              onSelect={(selected: string) => {
                setActive(selected)
                setRoutesModalOpen(false)
                unblurContent()
              }}
              handleClose={() => {
                setRoutesModalOpen(false)
                unblurContent()
              }}
            />
          </Grid>
        </Hidden>
      </Grid>
      <Divider className={classes.divider} />
    </>
  )
}
export default Header
