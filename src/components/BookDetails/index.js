import {Component} from 'react'
// import {AiFillLinkedin, AiFillInstagram} from 'react-icons/ai'
// import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

class BookDetails extends Component {
  state = {
    bookDetails: {},
    bidAmount: '',
    mobileNumber: '',
    isSubmitted: false,
  }

  componentDidMount = async () => {
    this.getBookDetails()
  }

   //Get book Details from local storage
   getBookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const getData = localStorage.getItem('booksList')
    const parsedData = JSON.parse(getData)
    const filteredData = parsedData.filter((each) => each.bookId === id) 
    this.setState({bookDetails: filteredData[0]}, this.getBiddingDetails)
  }

  onMobileNumber = event => this.setState({mobileNumber: event.target.value})

  onBidAmount = event => this.setState({bidAmount: event.target.value})

  renderBookDetails = () => {
    const {bookDetails} = this.state
    const {
      author,
      category,
      description,
      language,
      publicationYear,
      title,
      file,
    } = bookDetails

    return (
        
      <div className="book-details-container main-section">
        <img src={file} alt={title} className="book-details-image" />
        <div className="book-details-content">
          <div>
            <h1 className="book-details-heading">{title}</h1>
            <ul className="book-details-list">
              <li className="book-details-item">
                <p className="details-text">
                  Description:
                  <span className="details-value">{description}</span>
                </p>
              </li>
              <li className="book-details-item">
                <p className="details-text">
                  Author: <span className="details-value">{author}</span>
                </p>
              </li>
              <li className="book-details-item">
                <p className="details-text">
                  Publisher: <span className="details-value">NPA</span>
                </p>
              </li>
              <li className="book-details-item">
                <p className="details-text">
                  Publication Year:{' '}
                  <span className="details-value">{publicationYear}</span>
                </p>
              </li>

              <li className="book-details-item">
                <p className="details-text">
                  Language: <span className="details-value">{language}</span>
                </p>
              </li>
              <li className="book-details-item">
                <p className="details-text">
                  Category: <span className="details-value">{category}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details">{this.renderBookDetails()}</div>
      </>
    )
  }
}

export default BookDetails
