import React, { Component } from 'react'
import Login from './Login/Login'
import User from './User'

class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ?
          <User handleLogout={this.handleLogout.bind(this) } />
        :
          <Login handleLogin={this.handleLogin.bind(this) } />
        }
      </div>
    )
  }

  handleLogin() {
    this.setState({ isLoggedIn: true })
  }

  handleLogout() {
    this.setState({ isLoggedIn: false })
  }
}

export default Main
