import {useQuery, useMutation, useQueryClient} from 'react-query'

import {client} from 'utils/api-client'

const EMPLOYEE = 'employee'

function useEmployees() {
  const result = useQuery({
    queryKey: EMPLOYEE,
    queryFn: () => client(EMPLOYEE),
  })

  return {...result, employees: result.data}
}

function useDefaultOptions() {
  const queryClient = useQueryClient()

  const defaultMutationOptions = {
    onError: (err, variables, recover) =>
      typeof recover === 'function' ? recover() : null,
    onSettled: () => {
      queryClient.invalidateQueries(EMPLOYEE)
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
        const previousItems = queryClient.getQueryData(EMPLOYEE)
        queryClient.setQueryData(EMPLOYEE, old => {
          return old.filter(
            item => item.employee_id !== removedItem.employee_id,
          )
        })

        return () => queryClient.setQueryData(EMPLOYEE, previousItems)
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
    employee => client(EMPLOYEE, {data: employee}),
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
    employee => client(EMPLOYEE, {data: employee, method: 'PUT'}),
    {
      ...defaultMutationOptions,
      ...options,
    },
  )

  return {updateEmployee: rqMutation.mutate, ...rqMutation}
}

export {useCreateEmployee, useDeleteEmployee, useEmployees, useUpdateEmployee}
