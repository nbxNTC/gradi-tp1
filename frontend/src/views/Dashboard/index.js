import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../App'

import ApexCharts from "react-apexcharts"
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import './styles.css'

import img from '../../assets/logo.png'

const Dashboard = () => {

  const history = useHistory()
  const { setState } = useContext(Context)

  const [data, setData] = useState()

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL + 'dashboard')
      
      console.log(res.data)
      if (res.status === 200) setData(res.data)
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Erro ao exibir dashboard!'
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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

      {!data && (
        <div>
          Carregando
        </div>
      )}
      
      {data && (
        <div className='dashboard-content'>
          <h1>Dashboard</h1>

          <div className='charts'>
            <div className='chart'>
              <h2>Dados simples</h2>
              <div className='row'>
                <h3>Altura média dos alunos:</h3>
                <p>{Number(data.avgHeight).toFixed(2)}cm</p>
              </div>
              <div className='row'>
                <h3>Peso médio dos alunos:</h3>
                <p>{Number(data.avgWeigth).toFixed(2)}kg</p>
              </div>
              <div className='row'>
                <h3>Alunos homens:</h3>
                <p>{data.genderStats.men}</p>
              </div>
              <div className='row'>
                <h3>Alunas mulheres:</h3>
                <p>{data.genderStats.women}</p>
              </div>
            </div>

            <div className='chart'>
              <h2>Exercícios por dia</h2>
              <ApexCharts
                series={[
                  {
                    name: "Exercícios",
                    data: data.exercisesByDay
                  }
                ]}
                options={{
                  colors: [ '#fed800' ],
                  dataLabels: { enabled: false },
                  chart: { toolbar: { show: false } },
                  legend: { show: false },
                  markers: { size: 5 },
                  tooltip: { theme: 'dark' },
                  xaxis: {
                    categories: ['SEG', 'TER', 'QUA', 'QUI', 'SEX'],
                  }
                }}
              />
            </div>

            <div className='chart'>
              <h2>Exercícios por horário</h2>
              <ApexCharts
                series={[
                  {
                    name: "Exercícios",
                    data: data.exercisesBySchedule
                  }
                ]}
                options={{
                  colors: [ '#fed800' ],
                  dataLabels: { enabled: false },
                  chart: { toolbar: { show: false } },
                  legend: { show: false },
                  markers: { size: 5 },
                  tooltip: { theme: 'dark' },
                  xaxis: {
                    categories: ['MANHÃ', 'TARDE', 'NOITE'],
                  }
                }}
              />
            </div>

            <div className='chart'>
              <h2>Percentual dos exercícios por dia</h2>
              <ApexCharts
                series={data.exercisesPercByDay}
                type='pie'
                options={{
                  dataLabels: {
                    formatter: (val) => {
                      return val + '%'
                    }
                  },
                  chart: { toolbar: { show: false } },
                  legend: { show: true, labels: { colors: ['white'] } },
                  colors: ['#fed800', '#aed800', '#feae00', '#fe0015', '#333333'],
                  markers: { size: 5 },
                  tooltip: { theme: 'dark' },
                  labels: ['SEG', 'TER', 'QUA', 'QUI', 'SEX'],
                }}
              />
            </div>

            <div className='chart'>
              <h2>Percentual dos exercícios por horário</h2>
              <ApexCharts
                series={[33, 33, 34]}
                type='pie'
                options={{
                  dataLabels: {
                    formatter: (val) => {
                      return val + '%'
                    }
                  },
                  chart: { toolbar: { show: false } },
                  legend: { show: true, labels: { colors: ['white'] } },
                  colors: ['#fe0015', '#aed800', '#feae00'],
                  markers: { size: 5 },
                  tooltip: { theme: 'dark' },
                  labels: ['MANHÃ', 'TARDE', 'NOITE'],
                }}
              />
            </div>

            <div className='chart'>
              <h2>Equipamentos mais utilizados</h2>
              <ApexCharts
                series={[
                  {
                    data: Object.keys(data.equipmentUsage).map(key => ({
                      x: key,
                      y: data.equipmentUsage[key]
                    }))
                  }
                ]}
                type='treemap'
                options={{
                  chart: { toolbar: { show: false } },
                  legend: { show: true, labels: { colors: ['white'] } },
                  colors: ['#fe0015', '#aed800', '#feae00'],
                  markers: { size: 5 },
                  tooltip: { theme: 'dark' },
                  labels: ['MANHÃ', 'TARDE', 'NOITE'],
                }}
              />
            </div>
          </div>
        </div>
      )}

      <Snackbar open={Boolean(feedback)} onClose={() => setFeedback(null)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MuiAlert severity={feedback?.type} variant='filled' >{feedback?.message}</MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Dashboard