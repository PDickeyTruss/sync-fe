import {useDepartments} from 'utils/departments'
import {Title} from 'components/Title'
import {Box} from '@material-ui/core'
const Department = () => {
  const {departments, error, isLoading, isError, isSuccess} = useDepartments()

  return (
    <Box>
      <Title>Department</Title>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {departments ? (
            departments.map(d => (
              <tr key={d.DepartmentId}>
                <td>{d.DepartmentId}</td>
                <td>{d.DepartmentName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Loading</td>
            </tr>
          )}
        </tbody>
      </table>
    </Box>
  )
}

export {Department}
