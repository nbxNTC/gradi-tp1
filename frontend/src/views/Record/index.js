import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { validate } from 'validate.js'
import axios from 'axios'

import {
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem,
  Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import './styles.css'

const schema = {
  title: { presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' } },
  series: { presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' } },
  repetitions: { presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' } },
  rest: { presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' } },
  equipment_id: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[0-9]+', message: 'Não é permitido caracteres especiais' },
  },
  day: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[a-zA-Z]+', message: 'Não é permitido caracteres especiais' },
  },
  schedule: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[a-zA-Z]+', message: 'Não é permitido caracteres especiais' },
  },
}

const Record = () => {

  const history = useHistory()

  const [equipments, setEquipments] = useState([])

  const fetchData = async () => {
    
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL + 'equipments')
      if (res.status === 200) setEquipments(res.data)
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Erro ao exibir equipamentos!'
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
      series: '',
      repetitions: '',
      rest: '',
      equipment_id: -1,
      day: -1,
      schedule: -1,
    },
    touched: {
      title: false,
      observation: false,
      series: false,
      repetitions: false,
      rest: false,
      equipment_id: false,
      day: false,
      schedule: false,
    },
    errors: {
      title: null,
      observation: null,
      series: null,
      repetitions: null,
      rest: null,
      equipment_id: null,
      day: null,
      schedule: null,
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
      series,
      repetitions,
      rest,
      equipment_id,
      day,
      schedule,
    } = formState.values

    const body = {
      title,
      observation,
      series: Number(series),
      repetitions: Number(repetitions),
      rest: Number(rest),
      equipment_id: Number(equipment_id),
      day,
      schedule,
      record_id: history.location.state.id,
    }

    try {
      const res = await axios.post(process.env.REACT_APP_BASE_URL + 'exercises', body)
      
      console.log(res.data)
      if (res.status === 201) {
        setFeedback({
          type: 'success',
          message: 'Exercício cadastrado com sucesso!'
        })

        setFormState(initialState)
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Erro ao cadastrar exercício!'
      })
    }
  }

  const [feedback, setFeedback] = useState()

  const exercises = history.location.state.exercises
  const DAYS = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI'
  ]
  const DAYS_PT = {
    'MON': 'SEGUNDA',
    'TUE': 'TERÇA',
    'WED': 'QUARTA',
    'THU': 'QUINTA',
    'FRI': 'SEXTA',
  }
  const SCHEDULES = [
    'morning',
    'afternoon',
    'night',
  ]
  const SCHEDULES_PT = {
    'morning': 'Manhã',
    'afternoon': 'Tarde',
    'night': 'Noite',
  }

  console.log(exercises)

  return (
    <div className='container'>
      <div className='back-container'>
        <button onClick={() => history.goBack()}>Voltar</button>
      </div>
      <div className='record-content'>
        <div className='record-info'>
          <h1>Ficha do Aluno</h1>
          <h3>Título</h3>
          <p>{history.location.state.title}</p>
          <h3>Observações</h3>
          <p>{history.location.state.observation ? 'Nenhuma observação' : 'Nenhuma observação'}</p>
        </div>

        <div className='exercises'>
          <h1>Exercícios da ficha</h1>
          <div className='scroll'>
            {DAYS.map(day => (
              <>
                <h3>{DAYS_PT[day]}</h3>
                {SCHEDULES.map(schedule => (
                  <>
                    {Boolean(exercises.filter(exercise => exercise.day === day && exercise.schedule === schedule).length) && (
                      <>
                        <h4>{SCHEDULES_PT[schedule]}</h4>
                        {exercises.filter(exercise => exercise.day === day && exercise.schedule === schedule).map(item => (
                          <div className='record' key={item.id}>
                            <div className='row'>
                              <h3>Exercício:</h3>
                              <p>{item.title}</p>
                            </div>
                            <div className='row'>
                              <h3>Equipamento:</h3>
                              <p>{item.equipment.name}</p>
                            </div>
                            <div className='row'>
                              <h3>Séries:</h3>
                              <p>{item.series}</p>
                            </div>
                            <div className='row'>
                              <h3>Repetições:</h3>
                              <p>{item.repetitions}</p>
                            </div>
                            <div className='row'>
                              <h3>Descanço:</h3>
                              <p>{item.rest} segundos</p>
                            </div>
                            <div className='row'>
                              <h3>Observação:</h3>
                              <p style={{ textAlign: 'right' }}>{item.observation !== '' ? item.observation : 'Nenhuma observação'}</p>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ))}

                {!exercises.filter(exercise => exercise.day === day).length && <p>Nenhum exercício cadastrado</p>}
              </>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar Exercício</h1>
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
            style={{ height: '4rem' }}
            variant='outlined'
            placeholder='Séries'
            name='series'
            InputProps={{ endAdornment: <InputAdornment position='end'>vezes</InputAdornment> }}
            type='number'
            value={formState.values.series || ''}
            onChange={handleChange}
            error={hasError('series')}
            helperText={hasError('series') && formState.errors.series[0]}
          />
          <TextField
            style={{ height: '4rem' }}
            variant='outlined'
            placeholder='Repetições'
            InputProps={{ endAdornment: <InputAdornment position='end'>vezes</InputAdornment> }}
            type='number'
            name='repetitions'
            value={formState.values.repetitions || ''}
            onChange={handleChange}
            error={hasError('repetitions')}
            helperText={hasError('repetitions') && formState.errors.repetitions[0]}
          />
          <TextField
            style={{ height: '4rem' }}
            variant='outlined'
            placeholder='Descanço'
            name='rest'
            InputProps={{ endAdornment: <InputAdornment position='end'>segundos</InputAdornment> }}
            type='number'
            value={formState.values.rest || ''}
            onChange={handleChange}
            error={hasError('rest')}
            helperText={hasError('rest') && formState.errors.rest[0]}
          />
          <Select
            style={{ color: formState.values.equipment_id === -1 ? 'rgba(0, 0, 0, .3)' : 'black', marginBottom: '1.5rem' }}
            variant='outlined'
            name='equipment_id'
            value={formState.values.equipment_id || ''}
            onChange={handleChange}
          >
            <MenuItem value={-1} disabled>Equipamento</MenuItem>
            {equipments.map(item => (
              <MenuItem value={String(item.id)} key={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <Select
            style={{ color: formState.values.day === -1 ? 'rgba(0, 0, 0, .3)' : 'black', marginBottom: '1.5rem' }}
            variant='outlined'
            name='day'
            value={formState.values.day || ''}
            onChange={handleChange}
          >
            <MenuItem value={-1} disabled>Dia</MenuItem>
            {DAYS.map(item => (
              <MenuItem value={item} key={item}>{DAYS_PT[item]}</MenuItem>
            ))}
          </Select>
          <Select
            style={{ color: formState.values.schedule === -1 ? 'rgba(0, 0, 0, .3)' : 'black', marginBottom: '1.5rem' }}
            variant='outlined'
            name='schedule'
            value={formState.values.schedule || ''}
            onChange={handleChange}
          >
            <MenuItem value={-1} disabled>Horário</MenuItem>
            {SCHEDULES.map(item => (
              <MenuItem value={item} key={item}>{SCHEDULES_PT[item]}</MenuItem>
            ))}
          </Select>
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

export default Record