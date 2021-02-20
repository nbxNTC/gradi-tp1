import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './views/Login'
import Register from './views/Register'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/register" component={Register} exact/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes