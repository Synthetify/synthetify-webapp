import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useSelector, useDispatch } from 'react-redux'
import solanaConnectionSelector from '@selectors/solanaConnection'
// import { actions as providerActions } from '@reducers/provider'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import EventsHandlers from '@containers/EventsHandlers'
import Header from '@containers/HeaderWrapper/HeaderWrapper'
import WalletPage from '@containers/WalletPage/WalletPage'

import useStyles from './style'
import { Status } from '@reducers/solanaWallet'

const WelcomePage: React.FC = () => {
  const classes = useStyles()
  const signerStatus = useSelector(solanaConnectionSelector.status)
  const dispatch = useDispatch()
  React.useEffect(() => {
    // dispatch(providerActions.initProvider())
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])

  return (
    <Grid container direction='column' className={classes.background}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <WalletPage />
      </Grid>
      {/* <Grid item>
        {signerStatus === Status.Initalized ? getComponent(currentNavigation) : <PageSkeleton />}
      </Grid> */}
      {signerStatus === Status.Initalized && <EventsHandlers />}
    </Grid>
  )
}

export default WelcomePage
