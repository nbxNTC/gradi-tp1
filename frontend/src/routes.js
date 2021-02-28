import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Context } from './App'

import Login from './views/Login'
import Register from './views/Register'

import Trainer from './views/Trainer'
import Equipments from './views/Equipments'

const Routes = () => {

  const { state } = useContext(Context)

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/register" component={Register} exact/>

        {state?.currentUser?.role && (
          <>
            <Route path="/treinador" component={Trainer} exact/>
            <Route path="/treinador/equipamentos" component={Equipments} exact/>
          </>
        )}
      </Switch>
    </BrowserRouter>
  )
}

export default Routes