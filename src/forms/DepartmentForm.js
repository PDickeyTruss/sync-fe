import React from 'react'

import {TextField} from '@material-ui/core'

import {useDialogFormValues} from 'components/Dialog'

function DepartmentForm() {
  const [formValues, setFormValues] = useDialogFormValues()
  function updateFormValues(id, value) {
    const updatedFormValues = {...formValues}
    updatedFormValues[id] = value
    setFormValues(updatedFormValues)
  }

  return (
    <React.Fragment>
      <TextField
        autoFocus
        id="department_name"
        label="Name"
        fullWidth
        value={formValues['department_name']}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e => updateFormValues(e.target.id, e.target.value)}
      />
    </React.Fragment>
  )
}

export {DepartmentForm}
