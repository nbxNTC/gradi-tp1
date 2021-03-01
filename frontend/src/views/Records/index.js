import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { validate } from 'validate.js'
import moment from 'moment'
import axios from 'axios'

import {
  TextField,
  Button,
  Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import './styles.css'

const schema = {
  title: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[a-zA-Z\u00c0-\u024f\u1e00-\u1eff ]+', message: 'Não é permitido caracteres especiais' },
  },
}

const Records = () => {

  const history = useHistory()

  const [records, setRecords] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL + 'users/'+ history.location.state.id + '/records')
      
      console.log(res.data[0].records)
      if (res.status === 200) setRecords(res.data[0].records)
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Erro ao exibir ficha!'
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const initialState = {
    isValid: false,
    values: {
      title: '',
      observation: '',
    },
    touched: {
      title: false,
      observation: false,
    },
    errors: {
      title: null,
      observation: null,
    }
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    let newValue = value

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: newValue
      },
      touched: {
        ...formState.touched,
        [name]: true
      }
    }))
  }

  useEffect(() => {
    const errors = validate(formState.values, schema, { fullMessages: false })

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }))
  }, [formState.values])

  const hasError = (name) => Boolean(formState.touched[name] && formState.errors[name])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formState.isValid) return

    const {
      title,
      observation,
    } = formState.values

    const body = {
      title,
      observation,
      user_id: history.location.state.id
    }

    try {
      const res = await axios.post(process.env.REACT_APP_BASE_URL + 'records', body)
      
      console.log(res.data)
      if (res.status === 201) {
        setFeedback({
          type: 'success',
          message: 'Ficha cadastrada com sucesso!'
        })

        setFormState(initialState)
        fetchData()
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Erro ao cadastrar ficha!'
      })
    }
  }

  const [feedback, setFeedback] = useState()

  return (
    <div className='container'>
      <div className='back-container'>
        <button onClick={() => history.goBack()}>Voltar</button>
      </div>
      <div className='records-content'>
        <div className='profile'>
          <h1>Perfil do Aluno</h1>
          <h3>Nome</h3>
          <p>{history.location.state.name}</p>
          <h3>Data de Nascimento</h3>
          <p>{moment(history.location.state.birth_date).format('DD/MM/YYYY')}</p>
          <h3>Peso</h3>
          <p>{history.location.state.weight} kg</p>
          <h3>Altura</h3>
          <p>{history.location.state.height} cm</p>
          <h3>Gênero</h3>
          <p>{history.location.state.gender ? 'Masculino' : 'Feminino'}</p>
          <h3>Observações</h3>
          <p>{history.location.state.observation ? 'Nenhuma observação' : 'Nenhuma observação'}</p>
        </div>

        <div className='records'>
          <h1>Fichas cadastradas</h1>
          <div className='scroll'>
            {records.map(item => (
              <div className='record' key={item.id}>
                <p>{item.title}</p>
                <div className='actions'>
                  <button onClick={() => history.push('/treinador/alunos/fichas/exercicios', item)}>
                    Ver ficha
                  </button>
                </div>
              </div>
            ))}

            {!records.length && <p>Nenhuma ficha cadastrada</p>}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar Ficha</h1>
          <TextField
            style={{ height: '4rem' }}
            variant='outlined'
            placeholder='Título'
            name='title'
            value={formState.values.title || ''}
            onChange={handleChange}
            error={hasError('title')}
            helperText={hasError('title') && formState.errors.title[0]}
          />
          <TextField
            style={{ minHeight: '4rem', marginBottom: '1.5rem' }}
            variant='outlined'
            multiline
            rows={6}
            placeholder='Observação'
            name='observation'
            value={formState.values.observation || ''}
            onChange={handleChange}
            error={hasError('observation')}
            helperText={hasError('observation') && formState.errors.observation[0]}
          />
          <Button
            color='secondary'
            variant='contained'
            type='submit'
            disabled={!formState.isValid}
          >
            Cadastrar
          </Button>
        </form>
      </div>

      <Snackbar open={Boolean(feedback)} onClose={() => setFeedback(null)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MuiAlert severity={feedback?.type} variant='filled' >{feedback?.message}</MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Records