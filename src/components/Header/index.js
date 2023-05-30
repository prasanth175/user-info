import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    return (
      <nav className="navbar">
        <ul className="nav-list">
          <Link className="nav-link" to="/">
            <li className="nav-item">Users</li>
          </Link>
          <Link className="nav-link" to="/add-user">
            <li className="nav-item">Add User</li>
          </Link>
        </ul>
      </nav>
    )
  }
}

export default Header
