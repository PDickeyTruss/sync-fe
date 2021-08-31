import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Box, Container} from '@material-ui/core'

import './App.css'
import {Dashboard} from './ui/Dashboard'
import {AppRoutes} from './screens/AppRoutes'
import {Copyright} from './components/Copyright'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

function App(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Dashboard {...props}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <AppRoutes {...props} />
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </Dashboard>
    </div>
  )
}

export default App
