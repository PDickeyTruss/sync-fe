import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from '@material-ui/core'

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

import {Title} from 'components/Title'
import {EmployeeDialog} from 'components/EmployeeDialog'
import {UpdateEmployeeDialog} from 'components/UpdateEmployeeDialog'
import {useEmployees, useDeleteEmployee} from 'utils/employees'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
}))

const Employee = () => {
  const classes = useStyles()

  const {employees, error, isLoading, isError, isSuccess} = useEmployees()
  const {mutate: handleDelete} = useDeleteEmployee({throwOnError: true})

  return (
    <Paper className={classes.paper}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Title>Employees</Title>
        </Box>
        <Box>
          <EmployeeDialog />
        </Box>
      </Box>
      <TableContainer component={Paper} elevation={0}>
        <Table className={classes.table} aria-label="employees table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date of Hire</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {employees ? (
              employees.map(e => (
                <TableRow key={e.EmployeeId}>
                  <TableCell>{e.EmployeeId}</TableCell>
                  <TableCell>{e.EmployeeName}</TableCell>
                  <TableCell>{e.Department}</TableCell>
                  <TableCell>{e.DateOfHire}</TableCell>
                  <TableCell
                    align="right"
                    size="small"
                    style={{width: '128px'}}
                  >
                    <UpdateEmployeeDialog {...e} />
                    <IconButton
                      style={{padding: 0, marginLeft: 8, marginRight: 8}}
                      onClick={() => handleDelete(e.EmployeeId)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Loading</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export {Employee}
