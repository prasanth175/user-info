import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import NotFound from './components/NotFound'
import './App.css'
import Home from './components/Home'
import AddUserDetails from './components/AddUserDetails'
import UpdateUserDetails from './components/UpdateUserDetails'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add-user" component={AddUserDetails} />
        <Route exact path="/update-user/:id" component={UpdateUserDetails} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
