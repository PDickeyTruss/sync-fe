import './App.css'
import {Route, Switch, NavLink} from 'react-router-dom'
import {Home} from './screens/Home'
import {Department} from './screens/Department'
import {Employee} from './screens/Employee'

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
  )
}

export default App
