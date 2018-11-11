import React, { Component } from 'react'
import Header from 'Components/Header'
import Main from 'Components/Main'
import Footer from 'Components/Footer'
import User from './Objects/User'
import KKApi from 'Components/API/KKApi'

// TODO figure out how to use these everywhere
const Views = {
  Home: 'home',
  Wishlist: 'wishlist',
  MyKK: 'mykk',
  Settings: 'settings',
  Login: 'login',
  Signup: 'signup'
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      api: new KKApi(),
      currentUser: new User(),
      assignedKK: new User(),
      currentView: Views.Login
    }
  }

  setLoggedIn = (isLoggedIn, currentUser) => {
    this.setState({ isLoggedIn, currentUser })
    this.navigateToPage('home')
  }

  setLoggedOut = () => {
    this.setState({ isLoggedIn: false, currentUser: new User() })
  }

  navigateToPage = (page) => {
    this.setState({ currentView: page })
  }

  render() {
    return (
      <div className='app'>
        <Header
          appState={this.state}
          navigateToPage={this.navigateToPage}
          handleLogout={this.setLoggedOut} />

        <Main appState={this.state}
              setLoggedIn={this.setLoggedIn}
              navigateToPage={this.navigateToPage} />

        <Footer />

      </div>
    )
  }
}

export default App
