import React, { Component } from 'react'
import Header from 'Components/Header'
import User from './Objects/User'
import KKApi from 'Components/API/KKApi'

import Home from 'Components/Pages/Home'
import Login from 'Components/Pages/Login'
import MyKK from 'Components/Pages/MyKK'
import Wishlist from 'Components/Pages/Wishlist'
import Signup from 'Components/Pages/Signup'
import Navbar from 'Components/Navbar'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      year: 2020,
      isLoggedIn: false,
      api: new KKApi(),
      currentUser: new User(),
      assignmentDetails: {
        assignedKK: new User(),
        isAssignmentPending: true,
        isAssignmentError: false,
        isAssignmentLoaded: false
      }
    }
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <Header
              appState={this.state}
              navigateToPage={this.navigateToPage}
              handleLogout={this.setLoggedOut} />

          <Navbar isLoggedIn={this.state.isLoggedIn} handleLogout={this.setLoggedOut} />
          <Switch>
            <Route exact path='/' component= {() => <Home appState={this.state} setLoggedIn={this.setLoggedIn}/>}/>
            <Route path='/mywishlist' component = {() => <Wishlist appState={this.state} isLoggedIn={this.state.isLoggedIn}/>}/>
            <Route path='/mykk' component = {() => <MyKK appState={this.state} isLoggedIn={this.state.isLoggedIn}/>}/>
            <Route path='/signup' component = {() => <Signup appState={this.state}/>}/>
            <Route path='/login' component = {() => <Login appState={this.state} setLoggedIn={this.setLoggedIn} isLoggedIn={this.state.isLoggedIn}/>}/>
            <Route component = {() => <Home appState={this.state} setLoggedIn={this.setLoggedIn}/>}/>
          </Switch>
        </Router>
      </div>
    )
  }

  setLoggedIn = (currentUser) => {
    this.setState({ isLoggedIn: true, currentUser })
    this.getAssignedKK()
    window.location.hash = '/'
  }

  setLoggedOut = () => {
    this.setState({
      isLoggedIn: false,
      currentUser: new User()
     })
     window.location.hash = '/'
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
}

export default App