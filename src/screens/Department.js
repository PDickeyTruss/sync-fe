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
import {DepartmentForm} from 'forms/DepartmentForm'
import {
  useDepartments,
  useDeleteDepartment,
  useCreateDepartment,
  useUpdateDepartment,
} from 'utils/departments'

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

const Department = () => {
  const classes = useStyles()

  const {departments} = useDepartments()
  const {createDepartment} = useCreateDepartment()
  const {updateDepartment} = useUpdateDepartment()
  const {deleteDepartment} = useDeleteDepartment()

  return (
    <Paper className={classes.paper}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Title>Departments</Title>
        </Box>
        <Box>
          <Dialog>
            <DialogOpenButton>
              <Button
                aria-label="add department"
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                style={{marginBottom: 8}}
              >
                Add
              </Button>
            </DialogOpenButton>
            <DialogContents>
              <DialogTitle>Add Department</DialogTitle>
              <DialogContent>
                <DialogForm
                  onSubmit={createDepartment}
                  defaultValues={{
                    department_name: '',
                  }}
                >
                  <DepartmentForm />
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
        <Table aria-label="departments table">
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
                <TableRow key={d.department_id}>
                  <TableCell>{d.department_id}</TableCell>
                  <TableCell>{d.department_name}</TableCell>
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
                        <DialogTitle>Update Department</DialogTitle>
                        <DialogContent>
                          <DialogForm
                            onSubmit={updateDepartment}
                            defaultValues={{...d}}
                          >
                            <DepartmentForm />
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
                      onClick={() => deleteDepartment(d.department_id)}
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
