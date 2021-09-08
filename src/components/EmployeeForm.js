import React from 'react'

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import {useDepartments} from 'utils/departments'
import {useDialogFormValues} from 'components/Dialog'

function EmployeeForm() {
  const [formValues, setFormValues] = useDialogFormValues()
  function updateFormValues(id, value) {
    const updatedFormValues = {...formValues}
    updatedFormValues[id] = value
    setFormValues(updatedFormValues)
  }

  const {departments} = useDepartments()

  return (
    <React.Fragment>
      <TextField
        autoFocus
        id="EmployeeName"
        label="Name"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={formValues['EmployeeName']}
        onChange={e => updateFormValues(e.target.id, e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel id="Department-label" shrink>
          Department
        </InputLabel>
        <Select
          labelId="Department-label"
          id="Department"
          value={formValues['Department']}
          onChange={e => updateFormValues('Department', e.target.value)}
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
        id="DateOfHire"
        label="Date of Hire"
        type="date"
        fullWidth
        value={formValues['DateOfHire']}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e => updateFormValues(e.target.id, e.target.value)}
      />
    </React.Fragment>
  )
}

export {EmployeeForm}
