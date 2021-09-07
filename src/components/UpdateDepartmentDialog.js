import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'
import {makeStyles} from '@material-ui/core/styles'

import {useUpdateDepartment} from 'utils/departments'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    padding: theme.spacing(1),
  },
}))

function UpdateDepartmentDialog(department) {
  const classes = useStyles()
  const {DepartmentName} = department

  const [open, setOpen] = React.useState(false)
  const {updateDepartment} = useUpdateDepartment()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const eventElems = event.target.elements

    updateDepartment({
      ...department,
      DepartmentName: eventElems['department-name'].value,
    })

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
          <DialogTitle id="form-dialog-title">Edit Department</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="department-name"
              label="Name"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={DepartmentName}
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

export {UpdateDepartmentDialog}
