import React, { Component } from 'react'
import Home from 'Components/Pages/Home'
import Login from 'Components/Pages/Login'
import Signup from 'Components/Pages/Signup'
import MyKK from 'Components/Pages/MyKK'
import Wishlist from 'Components/Pages/Wishlist'

class Main extends Component {
  render() {

    return (
      <div className="main">
        {(() => {
          switch(this.props.appState.currentView) {
            case 'login':
              return <Login
                appState={this.props.appState}
                setLoggedIn={this.props.setLoggedIn}
                navigateToPage={this.props.navigateToPage} />
            case 'signup':
              return <Signup api={ this.props.appState.api } />
            case 'home':
              return <Home
                appState={ this.props.appState }
                navigateToPage={this.props.navigateToPage} />
            case 'wishlist':
              return <Wishlist appState={ this.props.appState } />
            case 'mykk':
              return <MyKK appState={ this.props.appState} />
            default:
              return <div>404</div>
          }})()
        }
      </div>
    )
  }
}

export default Main
