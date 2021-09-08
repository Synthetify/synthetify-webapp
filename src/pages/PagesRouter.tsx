import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toBlur } from '@consts/uiUtils'
import StakingPage from './StakingPage/StakingPage'
import { ExchangePage } from './ExchangePage/ExchangePage'
import Footer from '@components/Footer/Footer'
import HeaderWrapper from '@containers/HeaderWrapper/HeaderWrapper'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import EventsHandlers from '@containers/EventsHandlers'
import { Status } from '@reducers/solanaWallet'
import { Statistics } from '@containers/Statistics/Statistics'
import solanaConnectionSelector from '@selectors/solanaConnection'

export const PagesRouter: React.FC = () => {
  const dispatch = useDispatch()

  const signerStatus = useSelector(solanaConnectionSelector.status)

  useEffect(() => {
    // dispatch(providerActions.initProvider())
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])
  // TODO: add more paths to router later
  return (
    <Router>
      {signerStatus === Status.Initialized && <EventsHandlers />}
      <div id={toBlur}>
        <HeaderWrapper />
        <Switch>
          <Route path='/staking' component={StakingPage} />
          <Route path={'/exchange'} component={ExchangePage} />
          <Route path={'/stats'} component={Statistics} />
          <Route path='*'>
            <Redirect to='/staking'>
              <StakingPage />
            </Redirect>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default PagesRouter
