import React, { Component } from 'react'
import Home from './Pages/Home'

class Main extends Component {

  render() {
    return (
        <Home isLoggedIn={this.props.isLoggedIn} />
    )
  }
}

export default Main
