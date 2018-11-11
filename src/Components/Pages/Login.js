import React, { Component } from 'react'
import LoginDetails from '../API/Requests/Models/UserLoginDetails'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      loginDetails: new LoginDetails(),
      loginStatusMessage: ''
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

    var loginDetailsStatus = this.checkLoginDetails(this.state.loginDetails)
    if (loginDetailsStatus !== ''){
      alert(loginDetailsStatus)
      return
    }
    this.setState({ isLoading: true, loginStatusMessage: 'Logging in...' })
    var api = this.props.appState.api
    api.requestLogin(this.state.loginDetails, this.gotLoginResponse, this.gotLoginError)
  }

  render() {
    return (
      <form className='kk-form'>
        <h1>Login</h1>
        <label>Username / email address:</label>
        <input type='text' value={this.state.loginDetails.username} onChange={this.handleUsernameChange} /><br />
        <label>Password:</label>
        <input type='password' value={this.state.loginDetails.password} onChange={this.handlePasswordChange} />
        <div className='kk-status'>{this.state.loginStatusMessage}</div>
        <input
          type='submit'
          className={this.state.isLoading ? 'kk-button-disabled' : 'kk-button'}
          value='Login'
          onClick={this.handleSubmit}
        />
        <a className='form-text' onClick={this.navigateToSignup}>or, signup here!</a>
      </form>
    )
  }

  navigateToSignup = () => {
    this.props.navigateToPage('signup')
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
        this.gotLoginError(error)
    }
    this.setState({ isLoading: false })
}

  gotLoginError = (error) => {
    var details = this.state.loginDetails
    details.password = ''
    this.setState({
      isLoading: false,
      loginDetails: details,
      loginStatusMessage: error
    })
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
