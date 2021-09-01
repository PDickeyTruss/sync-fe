import React from 'react'
import {useTheme} from 'theme'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'

function ThemeToggle() {
  const {isDarkMode, toggleDarkMode} = useTheme()
  return (
    <div
      button
      onClick={() => {
        toggleDarkMode()
      }}
    >
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </div>
  )
}

export {ThemeToggle}
