import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { validate } from 'validate.js'
import { 
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem
} from '@material-ui/core'

import { formatDate, getOnlyNumbersString } from '../../helpers/utils'

import './styles.css'

import img from '../../assets/register.svg'

const schema = {
  name: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[a-zA-Z\u00c0-\u024f\u1e00-\u1eff ]+', message: 'Não é permitido caracteres especiais' },
  },
  birthDate: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[0-9]{2}[/][0-9]{2}[/][0-9]{4}', message: 'Data inválida' },
  },
  weight: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[0-9]+', message: 'São permitidos apenas números' },
  },
  height: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[0-9]+', message: 'São permitidos apenas números' },
  },
}

const Register = () => {

  const history = useHistory()

  const initialState = {
    isValid: false,
    values: {
      name: '',
      birthDate: '',
      gender: 1,
      weight: '',
      height: '',
      observation: '',
    },
    touched: {
      name: false,
      birthDate: false,
      gender: false,
      weight: false,
      height: false,
      observation: false,
    },
    errors: {
      name: null,
      birthDate: null,
      gender: null,
      weight: null,
      height: null,
      observation: null,
    }
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    let newValue = value

    if (name === 'birthDate') {
      newValue = formatDate(newValue)
    }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formState.isValid) return

    const {
      name,
      birthDate,
      gender,
      weight,
      height,
      observation,
    } = formState.values

    const body = {
      name,
      birth_date: moment(getOnlyNumbersString(birthDate).replace(/(\d{2})(\d{2})(\d{4})/g, '$2/$1/$3')).format(),
      gender: gender === 2 ? true : false,
      weight,
      height,
      observation
    }

    console.log(body)
  }

  return (
    <div className='container'>
      <div className='register-content'>
        <div className='img-container'>
          <img src={img} alt='Wallpaper' draggable='false'/>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Cadastro de cliente</h1>
          <div className='row'>
            <div className='col'>
              <TextField
                style={{ height: '4rem' }}
                variant='outlined'
                placeholder='Nome'
                name='name'
                value={formState.values.name || ''}
                onChange={handleChange}
                error={hasError('name')}
                helperText={hasError('name') && formState.errors.name[0]}
              />
              <TextField
                style={{ height: '4rem', margin: '1rem 0' }}
                variant='outlined'
                placeholder='Data de nascimento'
                name='birthDate'
                value={formState.values.birthDate || ''}
                onChange={handleChange}
                error={hasError('birthDate')}
                helperText={hasError('birthDate') && formState.errors.birthDate[0]}
              />
              <Select
                style={{ color: formState.values.gender === 1 ? 'rgba(0, 0, 0, .3)' : 'black', marginBottom: '.5rem' }}
                variant='outlined'
                name='gender'
                value={formState.values.gender || ''}
                onChange={handleChange}              
              >
                <MenuItem value={1} disabled>Gênero</MenuItem>
                <MenuItem value={2}>Masculino</MenuItem>
                <MenuItem value={3}>Feminino</MenuItem>
              </Select>
            </div>
            <div className='col'>
              <TextField
                style={{ height: '4rem' }}
                variant='outlined'
                placeholder='Peso'
                InputProps={{ endAdornment: <InputAdornment position='end'>kg</InputAdornment> }}
                name='weight'
                type='number'
                value={formState.values.weight || ''}
                onChange={handleChange}
                error={hasError('weight')}
                helperText={hasError('weight') && formState.errors.weight[0]}
              />
              <TextField
                style={{ height: '4rem', margin: '1rem 0' }}
                variant='outlined'
                placeholder='Altura'
                InputProps={{ endAdornment: <InputAdornment position='start'>cm</InputAdornment> }}
                name='height'
                type='number'
                value={formState.values.height || ''}
                onChange={handleChange}
                error={hasError('height')}
                helperText={hasError('height') && formState.errors.height[0]}
              />
            </div>
          </div>
          <div className='row' style={{ margin: 0, marginBottom: '.5rem' }}>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Observação'
              multiline
              rows={5}
              name='observation'
              value={formState.values.observation || ''}
              onChange={handleChange}
              error={hasError('observation')}
              helperText={hasError('observation') && formState.errors.observation[0]}
            />
          </div>
          <Button
            color='secondary'
            variant='contained'
            type='submit'
            disabled={!formState.isValid}
          >
            Cadastrar
          </Button>
          <Button
            color='inherit'
            type='button'
            onClick={() => history.goBack()}
          >
            Voltar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Register