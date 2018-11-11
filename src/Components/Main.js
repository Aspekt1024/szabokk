import React, { Component } from 'react'
import Home from 'Components/Pages/Home'
import Login from 'Components/UserAuthorization/Login'
import Signup from 'Components/UserAuthorization/Signup'
import Wishlist from 'Components/Wishlist/Wishlist'

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
              return <Home appState={ this.props.appState } />
            case 'wishlist':
              return <Wishlist appState={ this.props.appState } />
            default:
              return <div>404</div>
          }})()
        }
      </div>
    )
  }
}

export default Main
