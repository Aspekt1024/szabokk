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
      assignmentDetails: {
        assignedKK: new User(),
        isAssignmentPending: true,
        isAssignmentError: false,
        isAssignmentLoaded: false
      },
      currentView: Views.Home
    }
  }

  setLoggedIn = (currentUser) => {
    this.setState({ isLoggedIn: true, currentUser })
    this.navigateToPage('home')
    this.getAssignedKK()
  }

  setLoggedOut = () => {
    this.setState({
      isLoggedIn: false,
      currentUser: new User()
     })
     this.navigateToPage('home')
  }

  navigateToPage = (page) => {
    this.setState({ currentView: page })
  }

  // TODO move to separate function
  getAssignedKK = () => {
    this.state.api.getAssignment(
      this.state.currentUser.username,
      this.gotAssignmentResponse,
      this.gotAssignmentError
    )
  }

  gotAssignmentResponse = (message, err) => {
    var assignmentDetails = this.state.assignmentDetails
    if (err == null || err === '') {
      var assignedKK = assignmentDetails.assignedKK
      assignedKK.username = message
      assignmentDetails.assignedKK = assignedKK
    } else {
      this.gotAssignmentError(err)
    }
    if (err !== '202') {
      assignmentDetails.isAssignmentPending = false
    }
    assignmentDetails.isAssignmentLoaded = true
    this.setState({ assignmentDetails: assignmentDetails })
  }

  gotAssignmentError = (err) => {
    var assignmentDetails = this.state.assignmentDetails
    assignmentDetails.isAssignmentError = true
    assignmentDetails.isAssignmentLoaded = true
    if (err !== '202') {
      assignmentDetails.isAssignmentPending = false
    }
    this.setState({ assignmentDetails: assignmentDetails })
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
