import React, { Component } from 'react'
import Navbar from 'Components/Navbar'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-content">
          <h1 className="header-text">
            Szabo KK
          </h1>
          <p>
            2019 Edition
          </p>
        </div>
        <Navbar isLoggedIn={this.props.isLoggedIn} />
      </div>
    )
  }
}

export default Header
