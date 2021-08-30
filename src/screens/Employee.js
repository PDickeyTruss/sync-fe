import {useEmployees} from '../utils/employees'

const Employee = () => {
  const {employees, error, isLoading, isError, isSuccess} = useEmployees()

  return (
    <div>
      <h3>{`This is the Employee Page`}</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {employees
            ? employees.map(e => (
                <tr>
                  <td>{e.EmployeeId}</td>
                  <td>{e.EmployeeName}</td>
                </tr>
              ))
            : 'Loading'}
        </tbody>
      </table>
    </div>
  )
}

export {Employee}
