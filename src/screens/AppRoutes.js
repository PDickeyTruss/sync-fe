import {Route, Switch} from 'react-router-dom'
import {Home} from './Home'
import {Department} from './Department'
import {Employee} from './Employee'

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
    </Switch>
  )
}

export {AppRoutes}
