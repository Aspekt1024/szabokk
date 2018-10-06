import React, { Component } from 'react'

export default class Login extends Component {

    theUsername = 'user'
    thePassword = 'pass'

    constructor(props) {
        super(props)

        this.state = {
            userInput: '',
            passInput: '',
            loginMessage: ''
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                User:
                <input type="text" value={this.state.userInput} onChange={this.handleUserInputChange} />
                <br />
                Pass:
                <input type="password" value={this.state.passInput} onChange={this.handlePassInputChange} />
                <input type="submit" value="Login"/>

                <br />
                {this.state.loginMessage}
            </form>
        )
    }

    handleUserInputChange = (event) => {
        this.setState({ userInput: event.target.value })
    }
    handlePassInputChange = (event) => {
        this.setState({ passInput: event.target.value })
    }

    handleSubmit = (event) => {

        event.preventDefault()

        if (this.state.userInput === '') {
            this.setState({ loginMessage: 'Username cannot be blank' })
            return
        }
        if (this.state.passInput === '') {
            this.setState({ loginMessage: 'Password cannot be blank' })
            return
        }

        if (this.credentialsMatch()) {
            this.setState({ loginMessage: 'Login Success!' })
            // not sure how to update the text on screen before logging in
            this.handleLogin()
        }
        else {
            this.setState({ loginMessage: 'Invalid Credentials' })
        }
    }

    credentialsMatch() {
        if (this.theUsername !== this.state.userInput) {
            return false
        }
        if (this.thePassword !== this.state.passInput) {
            return false
        }
        return true
    }

    handleLogin() {
        alert ('logging in...')
    }
}