import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import {AddButton} from 'components/AddButton'

import {Title} from 'components/Title'
import {useEmployees} from 'utils/employees'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const Employee = () => {
  const classes = useStyles()

  const {employees, error, isLoading, isError, isSuccess} = useEmployees()

  return (
    <div style={{width: '100%'}}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Title>Employees</Title>
        </Box>
        <Box>
          <AddButton />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="employees table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date Of Hire</TableCell>
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
    </div>
  )
}

export {Employee}
