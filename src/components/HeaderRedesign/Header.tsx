import React from 'react'
import { PublicKey } from '@solana/web3.js'
import {
  Grid,
  CardMedia,
  IconButton,
  Divider,
  Hidden,
  ClickAwayListener,
  Box
} from '@material-ui/core'
import useStyles from './style'
import { MoreHoriz, Menu } from '@material-ui/icons'
import PhantomIcon from '@static/svg/phantom.svg'
import SolletIcon from '@static/svg/sollet.svg'
import snyIcon from '@static/icons/sny.png'
import NavbarButton from '@components/Navbar/Button'
import ChangeWalletButton from '@components/HeaderButton/ChangeWalletButton'
import SelectNetworkButton from '@components/HeaderButton/SelectNetworkButton'
import RoutesModal from '@components/Modals/RoutesModal/RoutesModal'
import { blurContent, unblurContent } from '@consts/uiUtils'

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

  const routes = ['staking', 'stats', 'exchange']
  const [activePath, setActive] = React.useState(landing)
  const [network, setNetwork] = React.useState('Mainnet')

  const [routesModalOpen, setRoutesModalOpen] = React.useState(false)
  const [routesModalAnchor, setRoutesModalAnchor] = React.useState<HTMLButtonElement | null>(null)

  return (
    <>
      <Grid container className={classes.root} wrap='nowrap' alignItems='center'>
        <Grid item container className={classes.left} wrap='nowrap' alignItems='center'>
          <Grid item>
            <CardMedia className={classes.snyLogo} image={snyIcon} />
          </Grid>
          <Grid item>
            <Divider orientation='vertical' className={classes.verticalDivider} />
          </Grid>
          <Hidden mdUp>
            <ClickAwayListener
              onClickAway={() => {
                if (routesModalOpen) {
                  setRoutesModalOpen(false)
                  unblurContent()
                }
              }}>
              <Grid item>
                <IconButton
                  className={classes.dehazeButton}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    setRoutesModalAnchor(event.currentTarget)
                    if (routesModalOpen) {
                      setRoutesModalOpen(false)
                      unblurContent()
                    } else {
                      setRoutesModalOpen(true)
                      blurContent()
                    }
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
                />
              </Grid>
            </ClickAwayListener>
          </Hidden>
        </Grid>
        <Hidden smDown>
          <Grid item container wrap='nowrap' alignItems='center' justify='flex-start'>
            {routes.map(path => (
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

        <Grid container item justify='flex-end' wrap='nowrap' alignItems='center'>
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
          <Hidden smDown>
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
          </Hidden>
          <Hidden mdUp>
            <ChangeWalletButton
              name='My&nbsp;wallet'
              options={['phantom', 'sollet', 'extension']}
              onSelect={onWalletSelect}
              connected={walletConnected}
              hideArrow={true}
            />
          </Hidden>
        </Grid>
        <IconButton className={classes.dotsButton} onClick={() => {}}>
          <MoreHoriz fontSize='large' className={classes.dehazeIcon} />
        </IconButton>
      </Grid>
      <Divider className={classes.divider} />
    </>
  )
}
export default HeaderRedesign
