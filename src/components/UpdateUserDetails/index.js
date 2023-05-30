import {Component} from 'react'
import './index.css'
import Header from '../Header'

const statusList = [
  {
    statusId: 'Active',
    statusText: 'Active',
  },
  {
    statusId: 'Inactive',
    statusText: 'Inactive',
  },
]

const genderList = [
  {
    genderId: 'Male',
    genderTxt: 'Male',
  },
  {
    genderId: 'Female',
    genderTxt: 'Female',
  },
  {
    genderId: 'Others',
    genderTxt: 'Others',
  },
]

class UpdateUserDetails extends Component {
  state = {
    status: statusList[0].statusId,
    name: '',
    email: '',
    gender: genderList[0].genderId,
    fieldsErrorStatus: false,
    fieldsErrorTxt: '',
    showMsgStatus: false,
    showMsgTxt: '',
    isSuccess: false,
  }

  onName = event => this.setState({name: event.target.value})

  onEmail = event => this.setState({email: event.target.value})

  onGender = event => this.setState({gender: event.target.value})

  onStatus = event => this.setState({status: event.target.value})

  componentDidMount = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `http://localhost:3006/users/${id}`
    const response = await fetch(url)
    const data = await response.json()
    this.setState({
      name: data.dbRes.name,
      email: data.dbRes.email,
      gender: data.dbRes.gender,
      status: data.dbRes.status,
    })
  }

  submitSellForm = event => {
    event.preventDefault()
    const {name, email} = this.state
    if (name === '' || email === '') {
      this.setState({
        fieldsErrorStatus: true,
        fieldsErrorTxt: 'All fields are Required*',
      })
    } else {
      this.setState({fieldsErrorStatus: false}, this.sendUserDetails)
    }
  }

  sendUserDetails = async () => {
    const {name, email, gender, status} = this.state
    const sellDetails = {
      status,
      name,
      email,
      gender,
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    const sellUrl = `http://localhost:3006/users/${id}`
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(sellDetails),
    }
    const response = await fetch(sellUrl, options)
    const data = await response.json()
    console.log(data.message)
    if (response.ok === true) {
      this.setState({
        showMsgStatus: true,
        showMsgTxt: data.message,
        isSuccess: true,
      })
    } else {
      this.setState({
        showMsgStatus: true,
        showMsgTxt: data.message,
        isSuccess: false,
      })
    }
  }

  render() {
    const {
      status,
      name,
      email,
      gender,
      fieldsErrorStatus,
      fieldsErrorTxt,
      showMsgStatus,
      showMsgTxt,
      isSuccess,
    } = this.state

    return (
      <>
        <Header />
        <div className="add-user-container main-section">
          <div className="add-user-inner-container">
            <h1 className="add-book-heading">Update User Details</h1>
            <form className="add-user-form" onSubmit={this.submitSellForm}>
              <label htmlFor="titleInput" className="add-label">
                Name: <span className="add-star-txt">*</span>
              </label>
              <input
                value={name}
                type="text"
                id="authorInput"
                className="add-input"
                onChange={this.onName}
              />
              <label htmlFor="titleInput" className="add-label">
                Email: <span className="add-star-txt">*</span>
              </label>
              <input
                value={email}
                type="email"
                id="authorInput"
                className="add-input"
                onChange={this.onEmail}
              />

              <label htmlFor="GenderId" className="add-label">
                Gender: <span className="add-star-txt">*</span>
              </label>
              <select
                value={gender}
                id="GenderId"
                className="add-input"
                onChange={this.onGender}
              >
                {genderList.map(each => (
                  <option key={each.genderId} value={each.genderId}>
                    {each.genderTxt}
                  </option>
                ))}
              </select>

              <label htmlFor="languageId" className="add-label">
                Status: <span className="add-star-txt">*</span>
              </label>
              <select
                value={status}
                id="languageId"
                className="add-input"
                onChange={this.onStatus}
              >
                {statusList.map(each => (
                  <option key={each.statusId} value={each.statusId}>
                    {each.statusText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-submit-btn">
                Update
              </button>
              {fieldsErrorStatus && (
                <p className="add-error-txt">{fieldsErrorTxt}</p>
              )}
              {showMsgStatus && (
                <div className={isSuccess ? 'success-txt' : 'failure-txt'}>
                  <p className="msg-txt">{showMsgTxt}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default UpdateUserDetails
