import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { toBlur } from '@consts/uiUtils'
import StakingPage from './StakingPage/StakingPage'
import WelcomePage from '@containers/WelcomePage/WelcomePage'

export const PagesRouter = () => {
  return (
    <Router>
      <div id={toBlur}>
        <Switch>
          <Route path='/staking' component={StakingPage} />
          <Route path='/exchange' component={WelcomePage} />
          <Route path='*' component={WelcomePage} />
        </Switch>
      </div>
    </Router>
  )
}

export default PagesRouter
