import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toBlur } from '@consts/uiUtils'
import StakingPage from './StakingPage/StakingPage'
import { ExchangePage } from './ExchangePage/ExchangePage'
import Footer from '@components/Footer/Footer'
import HeaderWrapper from '@containers/HeaderWrapper/HeaderWrapper'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import { getHaltedState } from '@selectors/exchange'
import EventsHandlers from '@containers/EventsHandlers'
import { Status } from '@reducers/solanaWallet'
import { StatisticsPage } from './StatisticsPage/StatisticsPage'
import solanaConnectionSelector from '@selectors/solanaConnection'
import InformationCard from '@components/InformationCard/InformationCard'
import { SwaplinePage } from './SwaplinePage/SwaplinePage'
import { loader } from '@selectors/ui'
import { balance, status } from '@selectors/solanaWallet'
import { SolWarning } from '@components/SolWarning/SolWarning'
import { printBN } from '@consts/utils'

export const PagesRouter: React.FC = () => {
  const dispatch = useDispatch()
  const halted = useSelector(getHaltedState)
  const solAmount = useSelector(balance)
  const loaderState = useSelector(loader)
  const walletStatus = useSelector(status)
  const signerStatus = useSelector(solanaConnectionSelector.status)

  useEffect(() => {
    // dispatch(providerActions.initProvider())
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])

  // TODO: add more paths to router later
  return (
    <Router>
      {halted ? <InformationCard /> : ''}
      <SolWarning open={+printBN(solAmount, 9) < 0.05 && walletStatus === Status.Initialized && !loaderState.open}
      />
      {signerStatus === Status.Initialized && <EventsHandlers />}
      <div id={toBlur}>
        <HeaderWrapper />
        <Switch>
          <Route path='/staking' component={StakingPage} />
          <Route path={'/exchange'} component={ExchangePage} />
          <Route path={'/statistics'} component={StatisticsPage} />
          <Route path={'/stats'} component={StatisticsPage} >
            <Redirect to='/statistics'>
              <StatisticsPage />
            </Redirect>
          </Route>
          <Route path={'/swapline'} component={SwaplinePage} />
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
