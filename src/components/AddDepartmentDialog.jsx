import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {makeStyles} from '@material-ui/core/styles'
import {useCreateDepartment} from 'utils/departments'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    padding: theme.spacing(1),
  },
}))

function AddDepartmentDialog() {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const {mutate: createDepartment} = useCreateDepartment()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const eventElems = event.target.elements
    const newDepartment = {
      DepartmentName: eventElems['department-name'].value,
    }

    createDepartment({data: newDepartment})

    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button
        aria-label="add department"
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
          <DialogTitle id="form-dialog-title">Add Department</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="department-name"
              label="Name"
              fullWidth
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

export {AddDepartmentDialog}
