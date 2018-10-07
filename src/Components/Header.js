import React, { Component } from 'react'
import LoginButton from './Buttons/LoginButton'

class Header extends Component {

  render() {
    return (
      <div className="header">
        Szabo KK 2018
        <LoginButton isLoggedIn={this.props.isLoggedIn}
                     handleLogout={this.props.handleLogout}
                     requestLogin={this.props.requestLogin} />
      </div>
    )
  }
}

export default Header
