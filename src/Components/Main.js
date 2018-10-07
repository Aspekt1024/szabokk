import React, { Component } from 'react'
import Login from './Login/Login'
import User from './User'
import Home from './Home'

class Main extends Component {

  render() {
    return (
      <div>
        {this.props.isLoggedIn ?
          <User handleLogout={this.props.handleLogout } />
        : this.props.loginRequested ?
          <Login handleLogin={this.props.handleLogin } />
        :
          <Home />
        }
      </div>
    )
  }
}

export default Main
