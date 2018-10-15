import React, { Component } from 'react'

class Main extends Component {
  render() {
    return (
      <div>
        <h1>Main</h1>
        <span className="main-status">{this.props.loggedIn ? 'Logged in' : 'Logged out'}</span>
      </div>
    )
  }
}

export default Main
