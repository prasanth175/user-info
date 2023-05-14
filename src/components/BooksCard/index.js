import {Link} from 'react-router-dom'
import './index.css'

const BookCard = props => {
  const {item} = props
  const {file, title, bookId, author} = item

  return (
    <Link className="book-item-link" to={`/books/${bookId}`}>
      <li className="books-item">
        <img className="books-img" src={file} alt={title} />
        <h1 className="books-title">{title}</h1>
        <p className="books-author">-  {author}</p>
      </li>
    </Link>
  )
}

export default BookCard
