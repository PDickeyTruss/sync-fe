import {useQuery} from 'react-query'
import {client} from './api-client'

function useDepartments() {
  const result = useQuery({
    queryKey: 'departments',
    queryFn: () => client('department'),
  })

  return {...result, departments: result.data}
}

export {useDepartments}
