import React from 'react'
import {createTheme} from '@material-ui/core/styles'
import {ThemeProvider as MuiThemeProvider} from '@material-ui/styles'

const localStorageKey = '__dark_mode__'

const ThemeContext = React.createContext()
ThemeContext.displayName = 'ThemeContext'

const darkTheme = {
  palette: {
    type: 'dark',
    primary: {
      main: '#b8f2e6',
    },
    secondary: {
      main: '#faf3dd',
    },
    info: {
      main: '#aed9e0',
    },
    error: {
      main: '#ffa69e',
    },
    background: {
      paper: '#5e6472',
    },
  },
}

const lightTheme = {
  palette: {
    type: 'light',
    primary: {
      main: '#009BE6',
    },
    secondary: {
      main: '#8F5CBA',
    },
    info: {
      main: '#aed9e0',
    },
    error: {
      main: '#F2674B',
    },
    warning: {
      main: '#DB70A1',
    },
  },
}

function ThemeProvider(props) {
  const [isDarkMode, setIsDarkMode] = React.useState(() =>
    JSON.parse(window.localStorage.getItem(localStorageKey)),
  )

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    window.localStorage.setItem(localStorageKey, !isDarkMode)
  }

  const theme = createTheme(isDarkMode ? darkTheme : lightTheme)
  const contextValue = {
    isDarkMode: isDarkMode,
    toggleDarkMode: toggleDarkMode,
    theme,
  }

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={contextValue} {...props} />
    </MuiThemeProvider>
  )
}

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error(`useTheme must be used within a ThemeProvider`)
  }
  return context
}

export {ThemeProvider, useTheme}
