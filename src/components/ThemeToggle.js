import React from 'react'
import {useTheme} from 'theme'
import {IconButton} from '@material-ui/core'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'

function ThemeToggle() {
  const {isDarkMode, toggleDarkMode} = useTheme()
  return (
    <IconButton
      onClick={toggleDarkMode}
      aria-label="toggle dark mode"
      color="inherit"
    >
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

export {ThemeToggle}
