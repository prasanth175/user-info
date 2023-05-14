import {Component} from 'react'
// import {AiFillLinkedin, AiFillInstagram} from 'react-icons/ai'
// import {Audio} from 'react-loader-spinner'
// import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import BookCard from '../BooksCard'


class Books extends Component {
    state={searchInput: '', booksList: [], isEmpty: false}

    componentDidMount = () => {
        this.getBooksDetails()
    }

    //Getting Books Data from local storage
    getBooksDetails = () => {
        const {searchInput} = this.state
        const booksData = localStorage.getItem('booksList')
        const parsedData = JSON.parse(booksData)
        if(parsedData === null){
        this.setState({isEmpty: true})
        }
        else{
          const filteredData = parsedData.filter((each) => each.title.toLowerCase().includes(searchInput))
          if(filteredData.length === 0){
        this.setState({isEmpty: true})
          }
          else{
            this.setState({booksList: filteredData, isEmpty: false})
          }
        }
    }

    onSearch = event =>
    this.setState({searchInput: event.target.value}, this.getBooksDetails)


    //Rendering Empty view
    renderEmptyView = () => (
      <div className="books-empty-container">
        <img
          src="https://cdn.dribbble.com/users/721524/screenshots/4117132/untitled-1-_1_.png"
          alt="not found"
          className="not-found-books"
        />
        <h1 className="empty-product-heading">No Product Available</h1>
      </div>
    )

    //Rendering Search
    renderSearch = () => {
        const {searchInput} = this.state
        return (
          <>
            <h1 className="search-heading">SEARCH THE BOOK YOU WANT</h1>
            <div className="search-bar">
              <input
                className="books-search-input"
                type="search"
                value={searchInput}
                onChange={this.onSearch}
                placeholder="Search here..."
              />
            </div>
          </>
        )
      }

      //Rendering Success view
    renderSuccessView = () => {
        const {booksList} = this.state
        return (
          <div>
            {booksList === null ? <p>Sorry</p>: <ul className="books-list">
              {booksList.map(each => (
                <BookCard item={each} key={each.bookId} />
              ))}
            </ul>}
          </div>
        )
      }

    render(){
      const {isEmpty} = this.state
        return(
            <>
            <Header />
            <div className='main-section'>
            <div className="books-header">{this.renderSearch()}</div>
            <div>{isEmpty ? this.renderEmptyView() :this.renderSuccessView()}</div>
            </div>
            </>
        )
    }
}


export default Books
