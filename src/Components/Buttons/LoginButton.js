import React, { Component } from 'react'
import Button from './Button'

export default class LoginButton extends Component {

    render() {
        return (
            <div>
                { this.props.isLoggedIn ?
                    <Button content='Logout' handleClick={this.props.handleLogout} />
                :
                    <Button content='Login' handleClick={this.props.handleSubmit} />
                }
            </div>
        )
    }
}