import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import TodoLogin from './components/TodoLogin'
import TodoSignup from './components/TodoSignup'
import TodoSignin from './components/TodoSignin'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/login" component={TodoLogin} />
    <Route exact path="/signin" component={TodoSignin} />
    <Route exact path="/signup" component={TodoSignup} />
    <Route path="/notfound" />
  </Switch>
)

export default App
