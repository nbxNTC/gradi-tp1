import React from 'react'
import { TextField, Button } from '@material-ui/core'

import './styles.css'

import img from '../../assets/logo.png'

const Login = () => {
  return (
    <div className='container'>
      <div className='login-content'>
        <div className='img-container'>
          <img src={img} alt='Wallpaper' draggable='false'/>
        </div>
        <form>
          <h1>Login</h1>
          <TextField
            variant='outlined'
            placeholder='Insira o seu ID'
          />
          <Button
            color='secondary'
            variant='contained'
          >
            Entrar
          </Button>
          <Button
            color='inherit'
            variant='text'
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login