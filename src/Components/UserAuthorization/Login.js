import React, { Component } from 'react'
import LoginDetails from '../API/Requests/Models/UserLoginDetails'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      loginDetails: new LoginDetails()
    }
  }

  handleUsernameChange = ({ target }) => {
    var details = this.state.loginDetails
    details.username = target.value
    this.setState({ loginDetails: details })
  }

  handlePasswordChange = ({ target }) => {
    var details = this.state.loginDetails
    details.password = target.value
    this.setState({ loginDetails: details })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (this.state.isLoading) {
      return
    }

    var isLoggedIn = this.props.appState.isLoggedIn
    if (isLoggedIn) {
      this.setLoggedOut()
    } else {
      var loginDetailsStatus = this.checkLoginDetails(this.state.loginDetails)
      if (loginDetailsStatus !== ''){
        alert(loginDetailsStatus)
        return
      }
      this.setState({ isLoading: true })
      var api = this.props.appState.api
      api.requestLogin(this.state.loginDetails, this.gotLoginResponse, this.gotLoginError)
    }
  }

  render() {
    var isLoggedIn = this.props.appState.isLoggedIn
    var user = this.props.appState.currentUser

    return (
      <form className="login login-form">
        { isLoggedIn ?
          <div>Hello, {user.username}</div>
        :
        <div className="login login-input">
          <label>
            Username:
            <input type="text" name="username" onChange={this.handleUsernameChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={this.handlePasswordChange} />
          </label>
        </div>
        }
        <input
          type="submit"
          className="button"
          value={isLoggedIn ? 'Logout' : 'Login'}
          onClick={this.handleSubmit}
        />
        <label>{this.state.isLoading ? 'loading' : 'idle'}</label>
      </form>
    )
  }

  setLoggedOut() {
    this.setState({ loginDetails: new LoginDetails() })
    this.setState({ isLoggedIn: false })
    this.props.setLoggedIn(false)
  }

  gotLoginResponse = (message, error) => {
    if (error === ''){
        var json = JSON.parse(message)
        var user = this.props.appState.currentUser
        user.username = json.username
        user.email = json.email
        this.props.setLoggedIn(true, user)
    }
    else {
        this.gotLoginError(new Error(message))
    }
    this.setState({ isLoading: false })
}

  gotLoginError = (error) => {
    this.setState({ isLoading: false })
    alert(error)
  }

  checkLoginDetails(loginDetails) {
    if (loginDetails.username == null || loginDetails.username === '') {
      return 'Username cannot be blank'
    } else if (loginDetails.password == null || loginDetails.password === '') {
      return 'Password cannot be blank'
    } else {
      return ''
    }
  }
}

export default Login
