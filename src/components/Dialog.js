import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'

const DialogContext = React.createContext()
DialogContext.displayName = 'DialogContext'

const FormContext = React.createContext()
FormContext.displayName = 'FormContext'

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn && fn(...args))

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    padding: theme.spacing(1),
  },
}))

function Dialog(props) {
  const [open, setOpen] = React.useState(false)

  return <DialogContext.Provider value={[open, setOpen]} {...props} />
}

function DialogCloseButton({children: child}) {
  const [, setIsOpen] = React.useContext(DialogContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function DialogSubmitButton({children: child}) {
  const [, setIsOpen] = React.useContext(DialogContext)
  return React.cloneElement(child, {
    type: 'submit',
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function DialogOpenButton({children: child}) {
  const [, setOpen] = React.useContext(DialogContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setOpen(true), child.props.onClick),
  })
}

function DialogContents(props) {
  const [open] = React.useContext(DialogContext)
  return <MuiDialog open={open} {...props} />
}

function DialogForm({defaultValues, onSubmit, ...props}) {
  const [formValues, setFormValues] = React.useState(() =>
    defaultValues ? defaultValues : {},
  )

  const handleOnSubmit = e => {
    e.preventDefault()

    if (typeof onSubmit === 'function') onSubmit(formValues)
  }

  const classes = useStyles()
  return (
    <FormContext.Provider value={[formValues, setFormValues]}>
      <form {...props} onSubmit={handleOnSubmit} className={classes.root} />
    </FormContext.Provider>
  )
}

function useDialogFormValues() {
  return React.useContext(FormContext)
}

export {
  Dialog,
  DialogOpenButton,
  DialogCloseButton,
  DialogContents,
  DialogSubmitButton,
  DialogForm,
  DialogActions,
  DialogContent,
  DialogTitle,
  useDialogFormValues,
}
