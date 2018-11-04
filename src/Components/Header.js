import React, { Component } from 'react'
import Login from 'Components/UserAuthorization/Login'

class Header extends Component {
  render() {
    return (
      <div className="header header-container">
        <span className="header banner">Szabo KK 2018</span>
        <Login
          isLoggedIn={this.props.isLoggedIn}
          setLoggedIn={this.props.setLoggedIn}
          api={this.props.api} />
      </div>
    )
  }
}

export default Header
