import React, {Component} from 'react'
import './index.css'
import Header from '../Header'
import {Oval} from 'react-loader-spinner'
import Users from '../Users'

const statusCheck = {
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
  isLoading: 'LOADING',
}

class Home extends Component {
  state = {
    isLoading: true,
    status: statusCheck.isLoading,
  }

  UpdateUserDetails = async id => {
    const {history} = this.props
    history.replace(`/update-user/${id}`)
  }

  componentDidMount = () => {
    this.getUserList()
  }

  getUserList = async () => {
    const url = 'https://gorest.co.in/public-api/users'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.data)
    if (data.data.length === 0) {
      this.setState({
        status: statusCheck.isFailure,
      })
    } else {
      this.setState({
        status: statusCheck.isSuccess,
        usersList: data.data,
      })
    }
  }

  renderFailureView = () => (
    <div className="not-found-container">
      <h1 className="no-info">No User Information is Added</h1>
    </div>
  )

  renderLoader = () => (
    <div className="load-container">
      <Oval
        height={50}
        width={50}
        color="white"
        ariaLabel="oval-loading"
        secondaryColor="white"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  )

  renderSuccessView = () => {
    const {usersList} = this.state
    return (
      <Users
        item={usersList}
        UpdateUserDetails={this.UpdateUserDetails}
        getUserList={this.getUserList}
      />
    )
  }

  renderAll = () => {
    const {status} = this.state
    switch (status) {
      case statusCheck.isSuccess:
        return this.renderSuccessView()
      case statusCheck.isFailure:
        return this.renderFailureView()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="user-heading">Users</h1>
          {this.renderAll()}
        </div>
      </>
    )
  }
}

export default Home
