import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'
import {makeStyles} from '@material-ui/core/styles'

import {useDepartments} from 'utils/departments'
import {useUpdateEmployee} from 'utils/employees'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    padding: theme.spacing(1),
  },
}))

function UpdateEmployeeDialog(employee) {
  const classes = useStyles()
  const {EmployeeName, DateOfHire, Department} = employee

  const [open, setOpen] = React.useState(false)
  const [department, setDepartment] = React.useState('')

  const {departments} = useDepartments()
  const {updateEmployee} = useUpdateEmployee()

  const handleClickOpen = () => {
    setDepartment(Department)
    setOpen(true)
  }

  const handleClose = () => {
    setDepartment('')
    setOpen(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const eventElems = event.target.elements
    const updatedEmployee = {
      ...employee,
      EmployeeName: eventElems['employee-name'].value,
      DateOfHire: eventElems['hire-date'].value,
      Department: department,
    }

    updateEmployee(updatedEmployee)

    setDepartment('')
    setOpen(false)
  }

  return (
    <React.Fragment>
      <IconButton
        style={{padding: 0, marginLeft: 8, marginRight: 8}}
        onClick={() => handleClickOpen()}
      >
        <UpdateIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <form onSubmit={handleSubmit} className={classes.root}>
          <DialogTitle id="form-dialog-title">Edit Employee</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="employee-name"
              label="Name"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={EmployeeName}
            />

            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="department-select-label" shrink>
                Department
              </InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={department}
                onChange={e => {
                  e.preventDefault()
                  setDepartment(e.target.value)
                }}
              >
                {departments
                  ? departments.map(d => (
                      <MenuItem key={d.DepartmentId} value={d.DepartmentId}>
                        {d.DepartmentName}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <TextField
              id="hire-date"
              label="Date of Hire"
              type="date"
              fullWidth
              defaultValue={DateOfHire}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}

export {UpdateEmployeeDialog}
