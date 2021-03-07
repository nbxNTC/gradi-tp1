import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../App'

import { TextField, Button, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import './styles.css'

import img from '../../assets/logo.png'

const Login = () => {

  const history = useHistory()
  const { state, setState } = useContext(Context)

  const [id, setId] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (id === '') return

    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL + 'users/' + id)
      
      if (res.status === 200) {
        setState(state => ({
          ...state,
          currentUser: res.data
        }))
        localStorage.setItem('state', JSON.stringify({
          ...state,
          currentUser: res.data
        }))

        if (res.data.role) history.push('/treinador')
        else history.push('/aluno/fichas', res.data)
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Usuário não encontrado!'
      })
    }
  }

  const [feedback, setFeedback] = useState()

  return (
    <div className='container'>
      <div className='login-content'>
        <div className='img-container'>
          <img src={img} alt='Wallpaper' draggable='false'/>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <TextField
            variant='outlined'
            placeholder='Insira o seu ID'
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <Button
            color='secondary'
            variant='contained'
            type='submit'
          >
            Entrar
          </Button>
          <Button
            color='inherit'
            variant='text'
            type='button'
            onClick={() => history.push('/register')}
          >
            Cadastrar
          </Button>
        </form>
      </div>

      <Snackbar open={feedback} onClose={() => setFeedback(null)} autoHideDuration={8000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert severity={feedback?.type} variant='filled' >{feedback?.message}</MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Login