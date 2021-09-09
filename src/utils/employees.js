import {useQuery, useMutation, useQueryClient} from 'react-query'

import {client} from 'utils/api-client'

function useEmployees() {
  const result = useQuery({
    queryKey: 'employee',
    queryFn: () => client('employee'),
  })

  return {...result, employees: result.data}
}

function useDefaultOptions() {
  const queryClient = useQueryClient()

  const defaultMutationOptions = {
    onError: (err, variables, recover) =>
      typeof recover === 'function' ? recover() : null,
    onSettled: () => {
      queryClient.invalidateQueries('employee')
    },
  }

  return {defaultMutationOptions, queryClient}
}

function useDeleteEmployee(options) {
  const {defaultMutationOptions, queryClient} = useDefaultOptions()

  const rqMutation = useMutation(
    employeeId => client(`employee/${employeeId}`, {method: 'DELETE'}),
    {
      onMutate: removedItem => {
        const previousItems = queryClient.getQueryData('employee')
        queryClient.setQueryData('employee', old => {
          return old.filter(
            item => item.employee_id !== removedItem.employee_id,
          )
        })

        return () => queryClient.setQueryData('employee', previousItems)
      },
      ...defaultMutationOptions,
      ...options,
    },
  )

  return {deleteEmployee: rqMutation.mutate, ...rqMutation}
}

function useCreateEmployee(options) {
  const {defaultMutationOptions} = useDefaultOptions()

  const rqMutation = useMutation(
    employee => client('employee', {data: employee}),
    {
      ...defaultMutationOptions,
      ...options,
    },
  )

  return {createEmployee: rqMutation.mutate, ...rqMutation}
}

function useUpdateEmployee(options) {
  const {defaultMutationOptions} = useDefaultOptions()

  const rqMutation = useMutation(
    employee => client('employee', {data: employee, method: 'PUT'}),
    {
      ...defaultMutationOptions,
      ...options,
    },
  )

  return {updateEmployee: rqMutation.mutate, ...rqMutation}
}

export {useCreateEmployee, useDeleteEmployee, useEmployees, useUpdateEmployee}
