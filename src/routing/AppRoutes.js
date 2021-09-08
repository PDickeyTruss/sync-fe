import {Route, Switch} from 'react-router-dom'
import {Home} from 'screens/Home'
import {Department} from 'screens/Department'
import {Employee} from 'screens/Employee'

function AppRoutes(props) {
  return (
    <Switch>
      <Route path="/home">
        <Home {...props} />
      </Route>
      <Route path="/employee">
        <Employee {...props} />
      </Route>
      <Route path="/department">
        <Department {...props} />
      </Route>
      <Route>
        <h1 style={{margin: 'auto', width: '100%', textAlign: 'center'}}>
          Page Not Found
        </h1>
      </Route>
    </Switch>
  )
}

export {AppRoutes}
