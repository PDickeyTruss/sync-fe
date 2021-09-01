import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

function AddButton() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let btn = (
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
  )

  let dialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
      <DialogContent>
        <DialogContentText>TODO</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" onClick={handleClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
  return (
    <React.Fragment>
      {btn}
      {dialog}
    </React.Fragment>
  )
}

export {AddButton}
