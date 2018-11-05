import React, { Component } from 'react'
import Login from 'Components/UserAuthorization/Login'

class Header extends Component {
  render() {
    return (
      <div className="header header-container">
        <span className="header banner">Szabo KK 2018</span>
        <div>
          <div className='button kk-button' onClick={this.gotoHome}>
              home
          </div>
        </div>

        {this.props.appState.isLoggedIn ?
          <div className='button kk-button' onClick={this.gotoWishlist}>
            wishlist
          </div>
        :
          <div>
            <div className='button kk-button' onClick={this.gotoSignup}>
              sign up
            </div>
            <div className='button kk-button' onClick={this.gotoWishlist}>
              wishlist
            </div>
          </div>
        }

        <Login
          appState={this.props.appState}
          setLoggedIn={this.props.setLoggedIn} />
      </div>
    )
  }

  gotoWishlist = e => {
    e.preventDefault()
    this.props.navigateToPage('wishlist')
  }

  gotoSignup = e => {
    e.preventDefault()
    this.props.navigateToPage('signup')
  }

  gotoHome = e => {
    e.preventDefault()
    this.props.navigateToPage('home')
  }
}

export default Header
