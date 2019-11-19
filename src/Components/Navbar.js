
import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'


class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        { this.props.isLoggedIn ?
          <Fragment>
            <NavLink exact={true} className='navbutton' activeClassName='navbutton-active' to='/'>Home</NavLink>
            <NavLink className='navbutton' activeClassName='navbutton-active' to='/mywishlist'>My Wishlist</NavLink>
            <NavLink className='navbutton' activeClassName='navbutton-active' to='/mykk'>My KK</NavLink>
            <NavLink className='navbutton' activeClassName='navbutton-active' onClick={this.handleLogout}>Logout</NavLink>
          </Fragment>
        :
          <Fragment>
            <NavLink exact={true} className='navbutton' activeClassName='navbutton-active' to='/'>Home</NavLink>
            <NavLink className='navbutton' activeClassName='navbutton-active' to='/login'>Login</NavLink>
            <NavLink className='navbutton' activeClassName='navbutton-active' to='/signup'>Sign Up</NavLink>
          </Fragment>
        }
      </div>
    )
  }

  handleLogout = e => {
    e.preventDefault()
    this.props.handleLogout()
  }
}

export default Navbar