import React from 'react'
import {useDepartments} from 'utils/departments'
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
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {makeStyles} from '@material-ui/core/styles'
import {useCreateEmployee} from 'utils/employees'

const useStyles = makeStyles(theme => ({
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

function EmployeeDialog() {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const [department, setDepartment] = React.useState('')

  const {departments} = useDepartments()
  const {mutate: createEmployee} = useCreateEmployee()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setDepartment('')
    setOpen(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const eventElems = event.target.elements
    const newEmployee = {
      EmployeeName: eventElems['employee-name'].value,
      DateOfHire: eventElems['hire-date'].value,
      Department: department,
    }

    createEmployee({data: newEmployee})

    setDepartment('')
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button
        aria-label="add employee"
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        style={{marginBottom: 8}}
        onClick={handleClickOpen}
      >
        Add
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <form onSubmit={handleSubmit} className={classes.root}>
          <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="employee-name"
              label="Name"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
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
                      <MenuItem value={d.DepartmentId}>
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
              defaultValue={buildDateString()}
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

export {EmployeeDialog}
