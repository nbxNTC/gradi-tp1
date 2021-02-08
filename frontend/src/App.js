import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

import './global.css'

import Routes from './routes'

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
          padding: '.8rem 0'
        },
        label: {
          textTransform: 'capitalize'
        }
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App