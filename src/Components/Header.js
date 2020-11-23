import React, { Component } from 'react'

class Header extends Component {
  render() {

    const {
      props : { appState }
    } = this

    return (
      <div className="header">
        <div className="header-content">
          <h1 className="header-text">
            Szabo KK
          </h1>
          <p>
            {appState.year} Edition
          </p>
        </div>
      </div>
    )
  }
}

export default Header
