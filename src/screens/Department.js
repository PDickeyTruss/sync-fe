import {useDepartments} from '../utils/departments'

const Department = () => {
  const {departments, error, isLoading, isError, isSuccess} = useDepartments()

  return (
    <div>
      <h3>{`This is the Department Page`}</h3>
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
    </div>
  )
}

export {Department}
