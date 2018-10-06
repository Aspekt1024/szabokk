import React, { Component } from 'react'

export default class User extends Component {
    render() {
        return (
            <div>
                This is the user page (login was successful)
                <form  onSubmit={this.handleLogoutClicked}>
                    <input type="submit" value="Log out" />
                </form>
            </div>
        )
    }

    handleLogoutClicked = (event) => {
        this.props.handleLogout()
        event.preventDefault()
    }
}