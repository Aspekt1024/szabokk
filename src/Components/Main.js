import React, { Component } from 'react'
import Home from 'Components/Pages/Home'
import Signup from 'Components/UserAuthorization/Signup'
import Wishlist from 'Components/Wishlist/Wishlist'

class Main extends Component {
  render() {

    return (
      <div>
        {(() => {
          switch(this.props.appState.currentView) {
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
