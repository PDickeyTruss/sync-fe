import {useEmployees} from 'utils/employees'
import {Title} from 'components/Title'
const Employee = () => {
  const {employees, error, isLoading, isError, isSuccess} = useEmployees()

  return (
    <div>
      <Title>Employees</Title>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {employees ? (
            employees.map(e => (
              <tr key={e.EmployeeId}>
                <td>{e.EmployeeId}</td>
                <td>{e.EmployeeName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Loading</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export {Employee}
