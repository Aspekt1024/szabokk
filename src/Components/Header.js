import React, { Fragment, Component } from 'react'
import Button from 'Components/Buttons/Button'

class Header extends Component {
  render() {
    return (
      <div className="header header-container">
        <span className="header banner">Szabo KK 2018</span>

        <div>
          <Button onClick={this.gotoHome} content="home" />
          {this.props.appState.isLoggedIn ?
            <Fragment>
              <Button onClick={this.gotoWishlist} content="wishlist" />
              <Button onClick={this.handleLogout} content="logout" />
            </Fragment>
          :
            <Fragment>
              <Button onClick={this.gotoLogin} content="login" />
              <Button onClick={this.gotoSignup} content="signup" />
            </Fragment>
          }
        </div>
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

  gotoLogin = e => {
    e.preventDefault()
    this.props.navigateToPage('login')
  }

  gotoHome = e => {
    e.preventDefault()
    this.props.navigateToPage('home')
  }

  handleLogout = e => {
    e.preventDefault()
    this.props.handleLogout()
  }
}

export default Header
