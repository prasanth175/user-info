import {Component} from 'react'
import {  Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    return (
            <nav className='navbar'>
                <ul className='nav-list'>
                    <Link className='nav-link' to='/online-books/'><li className='nav-item'>Books</li></Link>
                    <Link className='nav-link' to='/online-books/book-form'><li className='nav-item'>Book Form</li></Link>
                </ul>
            </nav>
    )
  }
}

export default Header
