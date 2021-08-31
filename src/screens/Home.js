import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import {Title} from '../components/Title'
import {Employee} from './Employee'
import {Department} from './Department'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  depositContext: {flex: 1},
}))

function Home(props) {
  const classes = useStyles()

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <Grid container spacing={3}>
      {/* Departments */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Department {...props} />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Title>Recent Deposits</Title>
          <Typography component="p" variant="h4">
            $3,024.00
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            on 15 March, 2019
          </Typography>
          <div>
            <Link color="primary" href="#">
              View balance
            </Link>
          </div>
        </Paper>
      </Grid>
      {/* Employees */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Employee {...props} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export {Home}
