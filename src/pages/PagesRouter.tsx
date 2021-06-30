import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toBlur } from '@consts/uiUtils'
import StakingPage from './StakingPage/StakingPage'
import Footer from '@components/Footer/Footer'
import HeaderRedesignWrapper from '@containers/HeaderRedesignWrapper/HeaderRedesignWrapper'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'

export const PagesRouter: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(providerActions.initProvider())
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])
  // TODO: add more paths to router later
  return (
    <Router>
      <div id={toBlur}>
        <HeaderRedesignWrapper />
        <Switch>
          <Route path='/staking' component={StakingPage} />
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
