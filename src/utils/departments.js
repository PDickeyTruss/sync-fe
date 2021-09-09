import {useQuery, useMutation, useQueryClient} from 'react-query'
import {client} from 'utils/api-client'

const DEPARTMENT = 'department'

function useDepartments() {
  const result = useQuery({
    queryKey: DEPARTMENT,
    queryFn: () => client(DEPARTMENT),
  })

  return {...result, departments: result.data}
}

function useDefaultOptions() {
  const queryClient = useQueryClient()

  const defaultMutationOptions = {
    onError: (err, variables, recover) =>
      typeof recover === 'function' ? recover() : null,
    onSettled: () => {
      queryClient.invalidateQueries(DEPARTMENT)
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
        const previousItems = queryClient.getQueryData(DEPARTMENT)
        queryClient.setQueryData(DEPARTMENT, old => {
          return old.filter(
            item => item.department_id !== removedItem.department_id,
          )
        })

        return () => queryClient.setQueryData(DEPARTMENT, previousItems)
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
    department => client(DEPARTMENT, {data: department}),
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
      client(DEPARTMENT, {
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
