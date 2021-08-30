import {useQuery} from 'react-query'
import {client} from './api-client'

function useEmployees() {
  const result = useQuery({
    queryKey: 'employees',
    queryFn: () => client('employee'),
  })

  return {...result, employees: result.data}
}

export {useEmployees}
