import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import './styles.css'

const StudentsRecords = () => {

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
            {records.map((item, index) => (
              <div className='record' key={index}>
                <p>{item.title}</p>
                <div className='actions'>
                  <button onClick={() => history.push('/aluno/fichas/exercicios', item)}>
                    Ver ficha
                  </button>
                </div>
              </div>
            ))}

            {!records.length && <p>Nenhuma ficha cadastrada</p>}
          </div>
        </div>
      </div>

      <Snackbar open={Boolean(feedback)} onClose={() => setFeedback(null)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MuiAlert severity={feedback?.type} variant='filled' >{feedback?.message}</MuiAlert>
      </Snackbar>
    </div>
  )
}

export default StudentsRecords