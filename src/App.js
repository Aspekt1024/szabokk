import React, { Component, Fragment } from 'react'
import Header from 'Components/Header'
import Main from 'Components/Main'
import User from 'Components/Objects/User'
import KKApi from 'Components/API/KKApi'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      api: new KKApi(),
      currentUser: new User(),
      assignedKK: new User()
    }
  }

  setLoggedIn = (isLoggedIn) => {
    this.setState({ isLoggedIn })
  }

  render() {
    return (
      <Fragment>

        <Header
          isLoggedIn={this.state.isLoggedIn}
          setLoggedIn={this.setLoggedIn}
          api={this.state.api} />

        <Main
          isLoggedIn={this.state.isLoggedIn}
          api={this.state.api} />

      </Fragment>
    )
  }
}

export default App
