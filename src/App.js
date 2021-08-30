import './App.css'
import {Route, Switch, NavLink} from 'react-router-dom'
import {Home} from './screens/Home'
import {Department} from './screens/Department'
import {Employee} from './screens/Employee'

function App() {
  return (
    <div className="App">
      <header
        style={{
          border: '1px solid black',
          boxShadow: '2px 2px 2px 1px grey',
          margin: 8,
        }}
      >
        <h3>Sync FE</h3>
        <nav>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/department">Department</NavLink>
            </li>
            <li>
              <NavLink to="/employee">Employee</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <div
        style={{
          border: '1px solid black',
          boxShadow: '2px 2px 2px 1px grey',
          margin: 8,
        }}
      >
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/employee">
            <Employee />
          </Route>
          <Route path="/department">
            <Department />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
