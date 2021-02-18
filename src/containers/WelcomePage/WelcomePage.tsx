import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { useSelector, useDispatch } from 'react-redux'
import solanaConnectionSelector from '@selectors/solanaConnection'
// import { actions as providerActions } from '@reducers/provider'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import EventsHandlers from '@containers/EventsHandlers'
import Header from '@containers/HeaderWrapper/HeaderWrapper'
import Account from '@containers/Account/Account'
import Staking from '@containers/Staking/Staking'
import SideMenu from '@components/SideMenu/SideMenu'

import useStyles from './style'
import { Status } from '@reducers/solanaWallet'
export enum UiLocation {
  Account,
  Staking,
  Exchange
}
const WelcomePage: React.FC = () => {
  const classes = useStyles()
  const signerStatus = useSelector(solanaConnectionSelector.status)
  const dispatch = useDispatch()
  const [location, setLocation] = useState(UiLocation.Account)
  React.useEffect(() => {
    // dispatch(providerActions.initProvider())
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])
  const getComponent = (location: UiLocation) => {
    switch (location) {
      case UiLocation.Account:
        return <Account />

      case UiLocation.Staking:
        return <Staking />

      default:
        return <Account />
    }
  }
  return (
    <Grid container direction='row' className={classes.background}>
      <div className={classes.side}>
        <SideMenu location={location} setLocation={setLocation}></SideMenu>
      </div>
      <Grid item className={classes.content}>
        <Grid container className={classes.contentContainer} justify='center'>
          <Grid item xs={12} className={classes.contentWrapper}>
            <Header />
          </Grid>
          <Grid item xs={12} className={classes.contentWrapper}>
            {getComponent(location)}
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid item>
        {signerStatus === Status.Initalized ? getComponent(currentNavigation) : <PageSkeleton />}
      </Grid> */}
      {signerStatus === Status.Initalized && <EventsHandlers />}
    </Grid>
  )
}

export default WelcomePage
