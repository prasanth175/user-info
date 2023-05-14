import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import NotFound from './components/NotFound'

import './App.css'
import Books from './components/Books'
import BookForm from './components/BookForm'
import BookDetails from './components/BookDetails'

class App extends Component {
  render() {
    return (

          <Switch>
        <Route exact path='/online-books/' component={Books} />
        <Route exact path='/online-books/book-form'  component={BookForm} />
        <Route exact path='/online-books/books/:id'  component={BookDetails} />
        <Route component={NotFound} />
        </Switch>
    )
  }
}

export default App
