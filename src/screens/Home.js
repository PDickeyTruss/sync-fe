import React from 'react'
import clsx from 'clsx'

import {makeStyles} from '@material-ui/core/styles'
import {Typography, Grid, Paper, Link} from '@material-ui/core'

import {Title} from 'components/Title'
import {Chart} from 'components/Chart'
import {Employee} from 'screens/Employee'
import {Department} from 'screens/Department'

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
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Title>Recent Deposits</Title>
          <Typography component="p" variant="h4">
            $4,024.04
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            on 13 March, 2021
          </Typography>
          <div>
            <Link color="primary" href="#">
              View balance
            </Link>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Employee {...props} />
      </Grid>
      <Grid item xs={12}>
        <Department {...props} />
      </Grid>
    </Grid>
  )
}

export {Home}
