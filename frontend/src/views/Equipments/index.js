import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../App'

import { TextField, Button, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import './styles.css'

import img from '../../assets/logo.png'

const Equipments = () => {

  const history = useHistory()
  const { setState } = useContext(Context)

  const [equipments, setEquipments] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL + 'equipments')
      
      console.log(res.data)
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

  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name === '') return
    
    const body = { name }

    try {
      const res = await axios.post(process.env.REACT_APP_BASE_URL + 'equipments', body)
      
      console.log(res.data)
      if (res.status === 201) {
        setFeedback({
          type: 'success',
          message: 'Equipamento cadastrado com sucesso!'
        })

        setName('')
        fetchData()
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Erro ao cadastrar equipamento!'
      })
    }
  }

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
      <div className='equipments-content'>
        <div className='equipments'>
          <h1>Equipamentos cadastrados</h1>

          <div className='scroll'>
            {equipments.map(item => (
              <div className='equipment' key={item.id}>
                <p>{item.name}</p>
              </div>
            ))}
            
            {!equipments.length && <p>Nenhum equipamento cadastrado</p>}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar equipamento</h1>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='Nome do equipamento'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button
            fullWidth
            color='secondary'
            variant='contained'
            type='submit'
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

export default Equipments