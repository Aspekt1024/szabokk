import React, { Component, Fragment } from 'react'

export default class Home extends Component {

    render() {
        var isLoggedIn = this.props.appState.isLoggedIn
        var user = this.props.appState.currentUser

        return (
            <form className='kk-form'>
                <h1>Szabo KK 2018</h1>
                {isLoggedIn ?
                    <Fragment>
                        <div className='kk-text'>
                            Hey, {user.username}!<br />
                            Welcome to the Szabo KK App for 2018!
                        </div>
                        <input type='submit' class='kk-button' value='My Wishlist' onClick={this.navigateToWishlist} />
                        <input type='submit' class='kk-button' value='My KK' onClick={this.navigateToMyKK} />
                    </Fragment>
                :
                    <Fragment>
                        <div className='kk-text'>
                            Welcome to the Szabo 2018 KK App!<br />
                            Login or Sign up to continue
                        </div>
                        <input type='submit' class='kk-button' value='Login' onClick={this.navigateToLogin} />
                        <input type='submit' class='kk-button' value='Sign up' onClick={this.navigateToSignup} />
                    </Fragment>
                }
            </form>
        )
    }

    navigateToLogin = e => {
        e.preventDefault()
        this.props.navigateToPage('login')
    }

    navigateToSignup = e => {
        e.preventDefault()
        this.props.navigateToPage('signup')
    }

    navigateToWishlist = e => {
        e.preventDefault()
        this.props.navigateToPage('wishlist')
    }

    navigateToMyKK = e => {
        e.preventDefault()
        this.props.navigateToPage('mykk')
    }
}