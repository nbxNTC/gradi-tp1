import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { Context } from '../../App'

import { Button, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import './styles.css'

import img from '../../assets/logo.png'

const Trainer = () => {

  const history = useHistory()
  const { state, setState } = useContext(Context)

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
      <div className='trainer-content'>
        <div className='message'>
          <h1>Bem vindo, {state.currentUser.name}!</h1>
          <p>
            Em nossa plataforma você pode criar fichas para seus alunos, 
            cadastrar equipamentos no sistema, e também utilizar a nossa 
            dashboard para analisar alguns dados que podem ser relevantes 
            para o seu trabalho.
          </p>

          <h1 style={{ marginTop: '4rem' }}>Atalhos</h1>
          <Button
            fullWidth
            style={{ marginBottom: '1rem' }}
            color='secondary'
            variant='contained'
            type='button'
            onClick={() => history.push('/treinador/alunos')}
          >
            Ver alunos
          </Button>
          <Button
            fullWidth
            style={{ marginBottom: '1rem' }}
            color='secondary'
            variant='contained'
            type='button'
            onClick={() => history.push('/treinador/dashboard')}
          >
            Ver dashboard
          </Button>
          <Button
            fullWidth
            style={{ marginBottom: '1rem' }}
            color='secondary'
            variant='contained'
            type='button'
            onClick={() => history.push('/treinador/equipamentos')}
          >
            Cadastrar equipamentos
          </Button>
        </div>

        <div className='profile'>
          <h1>Perfil</h1>
          <h3>Nome</h3>
          <p>{state.currentUser.name}</p>
          <h3>Data de Nascimento</h3>
          <p>{moment(state.currentUser.birth_date).format('DD/MM/YYYY')}</p>
          <h3>Peso</h3>
          <p>{state.currentUser.weight} kg</p>
          <h3>Altura</h3>
          <p>{state.currentUser.height} cm</p>
          <h3>Gênero</h3>
          <p>{state.currentUser.gender ? 'Masculino' : 'Feminino'}</p>
        </div>
      </div>

      <Snackbar open={feedback} onClose={() => setFeedback(null)} autoHideDuration={8000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert severity={feedback?.type} variant='filled' >{feedback?.message}</MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Trainer