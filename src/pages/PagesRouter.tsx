import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { toBlur } from '@consts/uiUtils'
import StakingPage from './StakingPage/StakingPage'
import Footer from '@components/Footer/Footer'
import HeaderRedesignWrapper from '@containers/HeaderRedesignWrapper/HeaderRedesignWrapper'

export const PagesRouter: React.FC = () => {
  // TODO: add more paths to router later
  return (
    <Router>
      <div id={toBlur}>
        <HeaderRedesignWrapper />
        <Switch>
          <Route path='/staking' component={StakingPage} />
          <Route path='*' component={StakingPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default PagesRouter
