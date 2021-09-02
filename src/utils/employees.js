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

  return useMutation(
    employeeId => client(`employee/${employeeId}`, {method: 'DELETE'}),
    {
      onMutate: removedItem => {
        const previousItems = queryClient.getQueryData('employee')
        queryClient.setQueryData('employee', old => {
          return old.filter(item => item.EmployeeId !== removedItem.EmployeeId)
        })

        return () => queryClient.setQueryData('employee', previousItems)
      },
      ...defaultMutationOptions,
      ...options,
    },
  )
}

function useCreateEmployee(options) {
  const {defaultMutationOptions} = useDefaultOptions()

  return useMutation(employee => client('employee', employee), {
    ...defaultMutationOptions,
    ...options,
  })
}

export {useCreateEmployee, useDeleteEmployee, useEmployees}
