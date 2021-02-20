import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'

import './styles.css'

import img from '../../assets/logo.png'

const Login = () => {

  const history = useHistory()

  const [id, setId] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(id)
  }

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
    </div>
  )
}

export default Login