import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { toBlur } from '@consts/uiUtils'

export const PagesRouter = () => {
  return (
    <Router>
      <div id={toBlur}>
        <Switch>
          <Route path='/staking'/>
          <Route path='/exchanges' />
          <Route path='*' />
        </Switch>
      </div>
    </Router>
  )
}

export default PagesRouter
