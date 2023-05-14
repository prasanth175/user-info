import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import Header from '../Header'

const categoryList = [
  {
    optionId: 'Competitive',
    displayTxt: 'Competitive',
  },
  {
    optionId: 'Engineering',
    displayTxt: 'Engineering',
  },
  {
    optionId: 'Medical',
    displayTxt: 'Medical',
  },
  {
    optionId: 'Pharmacy',
    displayTxt: 'Pharmacy',
  },
  {
    optionId: 'Science',
    displayTxt: 'Science',
  },
  {
    optionId: 'Other',
    displayTxt: 'Other',
  },
]

const languagesList = [
  {
    languageId: 'English',
    languageTxt: 'English',
  },
  {
    languageId: 'Telugu',
    languageTxt: 'Telugu',
  },
  {
    languageId: 'Hindi',
    languageTxt: 'Hindi',
  },
  {
    languageId: 'Other',
    languageTxt: 'Other',
  },
]

class SellBook extends Component {
  state = {
    categoryActiveId: categoryList[0].optionId,
    languageActiveId: languagesList[0].languageId,
    title: '',
    author: '',
    description: '',
    publication: '',
    file: null,
    isSuccess: false,
  }

  onCategory = event => {
    this.setState({categoryActiveId: event.target.value})
  }

  onTitle = event => this.setState({title: event.target.value})

  onAuthor = event => this.setState({author: event.target.value})

  onDescription = event => this.setState({description: event.target.value})

  onPublication = event => this.setState({publication: event.target.value})

  onLanguage = event => this.setState({languageActiveId: event.target.value})

  //storing image value
  onFile = event => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      this.setState({file: reader.result})
    }
    reader.readAsDataURL(file)
  }

  //Submitting Add Book Form
  submitAddBookForm = event => {
    event.preventDefault()
    const {
      title,
      author,
      description,
      publication,
      file,
    } = this.state
    if (
      title === '' ||
      author === '' ||
      description === '' ||
      publication === '' ||
      file === null
    ) {
      alert('All Fields are Required')
    } else {
      this.sendBookDetails()
    }
  }

  sendBookDetails = async () => {
    const storedList = localStorage.getItem('booksList')
    const myList = JSON.parse(storedList) || []
    const {
      categoryActiveId,
      languageActiveId,
      title,
      author,
      description,
      publication,
      file,
    } = this.state
    const bookId = uuidv4()
    const sellDetails = {
      category: categoryActiveId,
      language: languageActiveId,
      title,
      author,
      description,
      publication_year: publication,
      file,
      bookId,
    }
    myList.push(sellDetails)
    localStorage.setItem('booksList', JSON.stringify(myList))
    this.setState({isSuccess: true, title: '',
      author: '' ,
      description:'',
      publication: '',
      file: null})
  }

  render() {
    const {
      categoryActiveId,
      languageActiveId,
      title,
      author,
      description,
      publication,
      isSuccess,
    } = this.state

    return (
      <>
        <Header />
        <div className="add-book-container main-section">
          <div className="add-book-inner-container">
            <h1 className="add-book-heading">Add a Book</h1>
            <form className="add-book-form" onSubmit={this.submitAddBookForm}>
              <label htmlFor="categoryId" className="add-label">
                Category: <span className="add-star-txt">*</span>
              </label>
              <select
                value={categoryActiveId}
                id="categoryId"
                className="add-input"
                onChange={this.onCategory}
              >
                {categoryList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayTxt}
                  </option>
                ))}
              </select>
              <label htmlFor="titleInput" className="add-label">
                Title: <span className="add-star-txt">*</span>
              </label>
              <input
                value={title}
                type="text"
                id="authorInput"
                className="add-input"
                onChange={this.onTitle}
              />
              <label htmlFor="titleInput" className="add-label">
                Author: <span className="add-star-txt">*</span>
              </label>
              <input
                value={author}
                type="text"
                id="authorInput"
                className="add-input"
                onChange={this.onAuthor}
              />
              <label htmlFor="descInput" className="add-label">
                Description: <span className="add-star-txt">*</span>
              </label>
              <textarea
                value={description}
                type="text"
                id="descInput"
                className="add-input"
                onChange={this.onDescription}
              />
              <label
                htmlFor="publicationInput"
                className="add-label"
                cols="100"
              >
                Publication year: <span className="add-star-txt">*</span>
              </label>
              <input
                value={publication}
                type="text"
                id="publicationInput"
                className="add-input"
                onChange={this.onPublication}
              />
              <label htmlFor="languageId" className="add-label">
                Language: <span className="add-star-txt">*</span>
              </label>
              <select
                value={languageActiveId}
                id="languageId"
                className="add-input"
                onChange={this.onLanguage}
              >
                {languagesList.map(each => (
                  <option key={each.languageId} value={each.languageId}>
                    {each.languageTxt}
                  </option>
                ))}
              </select>

              <label htmlFor="fileInput" className="add-label">
                Book Image
              </label>
              <input id="fileInput" type="file" onChange={this.onFile} />
              <div className="add-btn-container">
                <button type="submit" className="add-submit-btn">
                  Submit
                </button>
                <button type="button" className="add-clear-btn">
                  Clear
                </button>
              </div>
              {isSuccess && <p className='success-txt'>Book Added Successfully</p>}
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default SellBook
