import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Context } from './App'

import Login from './views/Login'
import Register from './views/Register'

import Trainer from './views/Trainer'
import Students from './views/Students'
import Records from './views/Records'
import Record from './views/Record'
import Equipments from './views/Equipments'
import Dashboard from './views/Dashboard'

import StudentsRecords from './views/StudentRecords'
import StudentsRecord from './views/StudentsRecord'

const Routes = () => {

  const { state } = useContext(Context)

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/register" component={Register} exact/>

        <Route path="/aluno/fichas" component={StudentsRecords} exact/>
        <Route path="/aluno/fichas/exercicios" component={StudentsRecord} exact/>

        {state?.currentUser?.role && (
          <>
            <Route path="/treinador" component={Trainer} exact/>
            <Route path="/treinador/alunos" component={Students} exact/>
            <Route path="/treinador/alunos/fichas" component={Records} exact/>
            <Route path="/treinador/alunos/fichas/exercicios" component={Record} exact/>
            <Route path="/treinador/equipamentos" component={Equipments} exact/>
            <Route path="/treinador/dashboard" component={Dashboard} exact/>
          </>
        )}
      </Switch>
    </BrowserRouter>
  )
}

export default Routes