import React, { Component, Fragment } from 'react'
import Header from 'Components/Header'
import Main from 'Components/Main'
import User from './Objects/User'
import KKApi from 'Components/API/KKApi'

// TODO figure out how to use these everywhere
const Views = {
  Home: 'home',
  Wishlist: 'wishlist',
  Settings: 'settings'
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      api: new KKApi(),
      currentUser: new User(),
      assignedKK: new User(),
      currentView: Views.Home
    }
  }

  setLoggedIn = (isLoggedIn, currentUser = null) => {
    this.setState({ isLoggedIn })

    if (isLoggedIn && currentUser != null) {
      this.setState({ currentUser })
    } else if (!isLoggedIn) {
      this.setState({ currentUser: new User() })
    }
  }

  navigateToPage = (page) => {
    this.setState({ currentView: page })
  }

  render() {
    return (
      <Fragment>

        <Header
          appState={this.state}
          setLoggedIn={this.setLoggedIn}
          navigateToPage={this.navigateToPage} />

        <Main appState={this.state} />

      </Fragment>
    )
  }
}

export default App
