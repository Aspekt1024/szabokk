import React, { Component } from 'react'
import Login from './Login/Login'

class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userInput: '',
      passInput: '',
      credentials: null
    }
  }

  render() {
    return (
      <div className="header">
        Szabo KK 2018
        <Login isLoggedIn={this.props.isLoggedIn} handleLogin={this.props.handleLogin} handleLogout={this.props.handleLogout} />
      </div>
    )
  }
}

export default Header
