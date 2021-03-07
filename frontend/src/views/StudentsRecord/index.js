import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import './styles.css'

const Record = () => {

  const history = useHistory()

  const record = history.location.state
  const [exercises, setExercises] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL + 'exercises/' + record.id + '/records')
      if (res.status === 200) setExercises(res.data)
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Erro ao exibir exercícios!'
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [feedback, setFeedback] = useState()

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

  return (
    <div className='container'>
      <div className='back-container'>
        <button onClick={() => history.goBack()}>Voltar</button>
      </div>
      <div className='record-content'>
        <div className='left'>
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
                <div className='col'>
                  <h3>{DAYS_PT[day]}</h3>
                  {SCHEDULES.map(schedule => (
                    <>
                      {Boolean(exercises.length && exercises.filter(exercise => exercise.day === day && exercise.schedule === schedule).length) && (
                        <>
                          <h4>{SCHEDULES_PT[schedule]}</h4>
                          {exercises.filter(exercise => exercise.day === day && exercise.schedule === schedule).map(item => (
                            <div className='record' key={item.id}>
                              <div className='row'>
                                <h3>Exercício</h3>
                                <p>{item.title}</p>
                              </div>
                              <div className='row'>
                                <h3>Equipamento</h3>
                                <p>{item.equipment.name}</p>
                              </div>
                              <div className='row'>
                                <h3>Séries e Repetições</h3>
                                <p>{item.series} - {item.repetitions}</p>
                              </div>
                              <div className='row'>
                                <h3>Descanço</h3>
                                <p>{item.rest} segundos</p>
                              </div>
                              <div className='row'>
                                <h3>Observação</h3>
                                <p>{item.observation !== '' ? item.observation : 'Nenhuma observação'}</p>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  ))}

                  {!exercises.filter(exercise => exercise.day === day).length && <p>Nenhum exercício</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Snackbar open={Boolean(feedback)} onClose={() => setFeedback(null)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MuiAlert severity={feedback?.type} variant='filled' >{feedback?.message}</MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Record