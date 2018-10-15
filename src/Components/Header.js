import React, { Component } from 'react'
import Login from 'Components/Login/Login'

class Header extends Component {
  render() {
    return (
      <div className="header header-container">
        <span className="header banner">Szabo KK 2018</span>
        <Login handleLogin={this.props.handleLogin} />
      </div>
    )
  }
}

export default Header
