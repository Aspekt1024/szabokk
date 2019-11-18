import React, { Component } from 'react'
import Header from 'Components/Header'
import Footer from 'Components/Footer'
import User from './Objects/User'
import KKApi from 'Components/API/KKApi'

import Home from 'Components/Pages/Home'
import Login from 'Components/Pages/Login'
import MyKK from 'Components/Pages/MyKK'
import Wishlist from 'Components/Pages/Wishlist'
import Signup from 'Components/Pages/Signup'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
      }
    }
  }

  setLoggedIn = (currentUser) => {
    this.setState({ isLoggedIn: true, currentUser })
    this.getAssignedKK()
  }

  setLoggedOut = () => {
    this.setState({
      isLoggedIn: false,
      currentUser: new User()
     })
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
      <div className='App'>
        <Router>
          <Header
              appState={this.state}
              navigateToPage={this.navigateToPage}
              handleLogout={this.setLoggedOut} />

          <Switch>
            <Route exact path='/' component= {() => <Home appState={this.state} setLoggedIn={this.setLoggedIn} navigateToPage={this.navigateToPage}/>}/>
            <Route path='/mywishlist' component = {() => <Wishlist appState={this.state}/>}/>
            <Route path='/mykk' component = {() => <MyKK appState={this.state}/>}/>
            <Route path='/signup' component = {() => <Signup appState={this.state}/>}/>
            <Route path='/login' component = {() => <Login appState={this.state} setLoggedIn={this.setLoggedIn} navigateToPage={this.navigateToPage}/>}/>
            <Route component = {() => <Home appState={this.state} setLoggedIn={this.setLoggedIn} navigateToPage={this.navigateToPage}/>}/>
          </Switch>
        </Router>

        <Footer />
      </div>
    )
  }
}

export default App
