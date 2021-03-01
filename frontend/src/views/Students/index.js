import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../App'

import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import './styles.css'

import img from '../../assets/logo.png'

const Students = () => {

  const history = useHistory()
  const { setState } = useContext(Context)

  const [users, setUsers] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL + 'users')
      
      console.log(res.data)
      if (res.status === 200) setUsers(res.data)
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Erro ao exibir alunos!'
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [feedback, setFeedback] = useState()

  const handleLogout = () => {
    setState(null)
    history.push('/')
  }

  return (
    <div className='container'>
      <div className='topbar'>
        <img src={img} alt='logo' draggable='false'/>
        <ul>
          <li onClick={() => history.push('/treinador')}>Home</li>
          <li onClick={() => history.push('/treinador/alunos')}>Alunos</li>
          <li onClick={() => history.push('/treinador/equipamentos')}>Equipamentos</li>
          <li onClick={() => history.push('/treinador/dashboard')}>Dashboard</li>
          <li onClick={handleLogout}>Sair</li>
        </ul>
      </div>
      <div className='students-content'>
        <div className='students'>
          <h1>Alunos cadastrados</h1>

          <div className='scroll'>
            {users.filter(item => !item.role).map(item => (
              <div className='student' key={item.id}>
                <p>{item.name}</p>
                <div className='actions'>
                  <button onClick={() => history.push('/treinador/alunos/fichas', item)}>
                    Ver fichas
                  </button>
                </div>
              </div>
            ))}

            {!users.length && <p>Nenhum aluno cadastrado</p>}
          </div>
        </div>
      </div>

      <Snackbar open={Boolean(feedback)} onClose={() => setFeedback(null)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MuiAlert severity={feedback?.type} variant='filled' >{feedback?.message}</MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Students