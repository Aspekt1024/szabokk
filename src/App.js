import React, { Component, Fragment } from 'react'
import Header from 'Components/Header'
import Main from 'Components/Main'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false
    }
  }

  handleLogin = loggedIn => {
    this.setState({ loggedIn })
  }

  render() {
    return (
      <Fragment>
        <Header handleLogin={this.handleLogin} />
        <Main loggedIn={this.state.loggedIn} />
      </Fragment>
    )
  }
}

export default App
