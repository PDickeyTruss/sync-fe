import React from 'react'

import {makeStyles} from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import UpdateIcon from '@material-ui/icons/Update'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

import {Title} from 'components/Title'
import {EmployeeForm} from 'forms/EmployeeForm'
import {
  useEmployees,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
} from 'utils/employees'

import {
  Dialog,
  DialogCloseButton,
  DialogOpenButton,
  DialogContents,
  DialogSubmitButton,
  DialogForm,
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/Dialog'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  root: {
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    padding: theme.spacing(1),
  },
}))

function buildDateString() {
  const now = new Date()
  const dateString =
    now.getFullYear() +
    '-' +
    ('0' + (now.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + now.getDate()).slice(-2)

  return dateString
}

const Employee = () => {
  const classes = useStyles()

  const {employees} = useEmployees()
  const {createEmployee} = useCreateEmployee()
  const {updateEmployee} = useUpdateEmployee()
  const {deleteEmployee} = useDeleteEmployee()

  return (
    <Paper className={classes.paper}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Title>Employees</Title>
        </Box>
        <Box>
          <Dialog>
            <DialogOpenButton>
              <Button
                aria-label="add employee"
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                style={{marginBottom: 8}}
              >
                Add
              </Button>
            </DialogOpenButton>
            <DialogContents>
              <DialogTitle>Add Employee</DialogTitle>
              <DialogContent>
                <DialogForm
                  onSubmit={createEmployee}
                  defaultValues={{
                    DateOfHire: buildDateString(),
                    Department: '',
                    EmployeeName: '',
                  }}
                >
                  <EmployeeForm />
                  <DialogActions>
                    <DialogCloseButton>
                      <Button color="primary">Cancel</Button>
                    </DialogCloseButton>
                    <DialogSubmitButton>
                      <Button color="primary">Submit</Button>
                    </DialogSubmitButton>
                  </DialogActions>
                </DialogForm>
              </DialogContent>
            </DialogContents>
          </Dialog>
        </Box>
      </Box>
      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="employees table">
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
                    <Dialog>
                      <DialogOpenButton>
                        <IconButton
                          style={{padding: 0, marginLeft: 8, marginRight: 8}}
                        >
                          <UpdateIcon />
                        </IconButton>
                      </DialogOpenButton>
                      <DialogContents>
                        <DialogTitle>Update Employee</DialogTitle>
                        <DialogContent>
                          <DialogForm
                            onSubmit={updateEmployee}
                            defaultValues={{...e}}
                          >
                            <EmployeeForm />
                            <DialogActions>
                              <DialogCloseButton>
                                <Button color="primary">Cancel</Button>
                              </DialogCloseButton>
                              <DialogSubmitButton>
                                <Button color="primary">Submit</Button>
                              </DialogSubmitButton>
                            </DialogActions>
                          </DialogForm>
                        </DialogContent>
                      </DialogContents>
                    </Dialog>
                    <IconButton
                      style={{padding: 0, marginLeft: 8, marginRight: 8}}
                      onClick={() => deleteEmployee(e.EmployeeId)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export {Employee}
