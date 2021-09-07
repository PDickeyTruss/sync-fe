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

import {AddDepartmentDialog} from 'components/AddDepartmentDialog'
import {UpdateDepartmentDialog} from 'components/UpdateDepartmentDialog'
import {useDepartments, useDeleteDepartment} from 'utils/departments'
import {Title} from 'components/Title'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
}))

const Department = () => {
  const classes = useStyles()
  const {departments} = useDepartments()
  const {deleteDepartment} = useDeleteDepartment({throwOnError: true})

  return (
    <Paper className={classes.paper}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Title>Departments</Title>
        </Box>
        <Box>
          <AddDepartmentDialog />
        </Box>
      </Box>
      <TableContainer component={Paper} elevation={0}>
        <Table className={classes.table} aria-label="departments table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {departments ? (
              departments.map(d => (
                <TableRow key={d.DepartmentId}>
                  <TableCell>{d.DepartmentId}</TableCell>
                  <TableCell>{d.DepartmentName}</TableCell>
                  <TableCell
                    align="right"
                    size="small"
                    style={{width: '128px'}}
                  >
                    <UpdateDepartmentDialog {...d} />
                    <IconButton
                      style={{padding: 0, marginLeft: 8, marginRight: 8}}
                      onClick={() => deleteDepartment(d.DepartmentId)}
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

export {Department}
