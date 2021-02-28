import React, { useState, useEffect, createContext } from 'react'

import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import './global.css'

import Routes from './routes'

export const Context = createContext()

const App = () => {

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#1a1a1a' },
      secondary: { main: '#fed800' }
    },
    typography: {
      fontFamily: 'Roboto',
      fontSize: 14,
    },
    overrides: {
      MuiInputBase: {
        root: {
          backgroundColor: '#fff'
        }
      },
      MuiButton: {
        root: {
          padding: '.8rem 0',
        },
        label: {
          textTransform: 'capitalize'
        },
        contained: {
          '&.Mui-disabled': {
            backgroundColor: 'rgb(170, 170, 170)',
            color: 'rgb(130, 130, 130)'
          }
        }
      }
    }
  })

  const [state, setState] = useState()

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <Context.Provider value={{ state, setState }}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Context.Provider>
  )
}

export default App