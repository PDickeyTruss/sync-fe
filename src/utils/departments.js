import {useQuery, useMutation, useQueryClient} from 'react-query'
import {client} from 'utils/api-client'

function useDepartments() {
  const result = useQuery({
    queryKey: 'department',
    queryFn: () => client('department'),
  })

  return {...result, departments: result.data}
}

function useDefaultOptions() {
  const queryClient = useQueryClient()

  const defaultMutationOptions = {
    onError: (err, variables, recover) =>
      typeof recover === 'function' ? recover() : null,
    onSettled: () => {
      queryClient.invalidateQueries('department')
      queryClient.invalidateQueries('employee')
    },
  }

  return {defaultMutationOptions, queryClient}
}

function useDeleteDepartment(options) {
  const {defaultMutationOptions, queryClient} = useDefaultOptions()

  const rqMutation = useMutation(
    departmentId => client(`department/${departmentId}`, {method: 'DELETE'}),
    {
      onMutate: removedItem => {
        const previousItems = queryClient.getQueryData('department')
        queryClient.setQueryData('department', old => {
          return old.filter(
            item => item.department_id !== removedItem.department_id,
          )
        })

        return () => queryClient.setQueryData('department', previousItems)
      },
      ...defaultMutationOptions,
      ...options,
    },
  )

  return {deleteDepartment: rqMutation.mutate, ...rqMutation}
}

function useCreateDepartment(options) {
  const {defaultMutationOptions} = useDefaultOptions()

  const rqMutation = useMutation(
    department => client('department', {data: department}),
    {
      ...defaultMutationOptions,
      ...options,
    },
  )

  return {createDepartment: rqMutation.mutate, ...rqMutation}
}

function useUpdateDepartment(options) {
  const {defaultMutationOptions} = useDefaultOptions()

  const rqMutation = useMutation(
    department =>
      client('department', {
        data: department,
        method: 'PUT',
      }),
    {
      ...defaultMutationOptions,
      ...options,
    },
  )

  return {updateDepartment: rqMutation.mutate, ...rqMutation}
}

export {
  useCreateDepartment,
  useDeleteDepartment,
  useDepartments,
  useUpdateDepartment,
}
