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

    if (this.props.isLoggedIn) {
      this.setLoggedOut()
    } else {
      var loginDetailsStatus = this.checkLoginDetails(this.state.loginDetails)
      if (loginDetailsStatus !== ''){
        alert(loginDetailsStatus)
        return
      }
      this.setState({ isLoading: true })
      this.props.api.requestLogin(this.state.loginDetails, this.gotLoginResponse, this.gotLoginError)
    }
  }

  render() {
    return (
      <form className="login login-form">
        { this.props.isLoggedIn ?
          <div>Hello, user</div>
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
          value={this.props.isLoggedIn ? 'Logout' : 'Login'}
          onClick={this.handleSubmit}
        />
        <label>{this.state.isLoading ? 'loading' : 'idle'}</label>
      </form>
    )
  }

  setLoggedOut() {
    this.setState({ username: '' })
    this.setState({ password: '' })
    this.setState({ isLoggedIn: false })
    this.props.setLoggedIn(false)
  }

  gotLoginResponse = (message, error) => {
    if (error === ''){
        this.props.setLoggedIn(true)
    }
    else {
        this.gotError(new Error(message))
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
