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
        id="employee_name"
        label="Name"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={formValues.employee_name}
        onChange={e => updateFormValues(e.target.id, e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel id="Department-label" shrink>
          Department
        </InputLabel>
        <Select
          labelId="Department-label"
          id="department"
          value={formValues.department}
          onChange={e => updateFormValues('department', e.target.value)}
        >
          {departments
            ? departments.map(d => (
                <MenuItem key={d.department_id} value={d.department_id}>
                  {d.department_name}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>

      <TextField
        id="date_of_hire"
        label="Date of Hire"
        type="date"
        fullWidth
        value={formValues['date_of_hire']}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e => updateFormValues(e.target.id, e.target.value)}
      />
    </React.Fragment>
  )
}

export {EmployeeForm}
