import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

export default class Home extends Component {

    render() {

        const {
            props : { appState }
        } = this

        var isLoggedIn = appState.isLoggedIn
        var user = appState.currentUser
        var year = appState.year

        return (
            <div className='page'>
                {isLoggedIn ?
                    <Fragment>
                        <div>
                            Hey, {user.username}!<br />
                            Welcome to the Szabo KK App for {year}!
                        </div>
                        <div className='kk-form'>
                            <NavLink className='kk-button' to='/mywishlist'>My Wishlist</NavLink>
                            <NavLink className='kk-button' to='/mykk'>My KK</NavLink>
                        </div>
                    </Fragment>
                :
                    <Fragment>
                        <div>
                            Welcome to the Szabo {year} KK App!<br />
                            Login or Sign up to continue
                        </div>
                        <div className='kk-form'>
                            <NavLink className='kk-button' to={'/login'}>Login</NavLink>
                            <NavLink className='kk-button' to={'/signup'}>Sign Up</NavLink>
                        </div>
                    </Fragment>
                }
            </div>
        )
    }
}