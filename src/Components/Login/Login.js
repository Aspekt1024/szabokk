import React, { Component } from 'react'
import userDB from './userDb'

class Login extends Component {
  constructor() {
    super()
    this.state = { loggedIn: false }
  }

  // the next two methods receive event infromation
  // with different syntax. I like the first because
  // it's more compact
  handleUsernameChange = ({ target }) => {
    this.setState({ username: target.value })
  }

  handlePasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.validUserPass(this.state)) {
      this.props.handleLogin(true)
      this.setState({
        loggedIn: true
      })
    }
  }

  validUserPass = ({ username, password }) => username === 'user' && password === 'pass'

  render() {
    return (
      <form className="login login-form">
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
        <input
          type="submit"
          value={this.state.loggedIn ? 'Logout' : 'Login'}
          onClick={this.handleSubmit}
        />
      </form>
    )
  }
}

export default Login
