import React, { Component, Fragment } from 'react'

export default class Home extends Component {

    render() {
        var isLoggedIn = this.props.appState.isLoggedIn
        var user = this.props.appState.currentUser

        return (
            <Fragment>
                <span>Home page</span>
                <div>
                    {isLoggedIn ?
                        <div>you're logged in as {user.username} ({user.email})</div>
                    :
                        <div>you're not logged in. Login or signup now! (provide links)</div>
                    }
                </div>
            </Fragment>
        )
    }
}