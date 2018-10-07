import React, { Component } from 'react'
import Credentials from './Credentials'

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userInput: '',
            passInput: '',
            loginMessage: '',
            credentials: null
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

    componentDidMount = () => {
        this.setState({ credentials: new Credentials() })
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

        if (this.state.credentials == null) {
            return
        }

        if (this.state.credentials.PasswordMatches(this.state.userInput, this.state.passInput)) {
            this.setState({ loginMessage: 'Login Success!' })
            // not sure how to update the text on screen before logging in
            this.props.handleLogin()
        }
        else {
            this.setState({ loginMessage: 'Invalid Credentials' })
        }
    }
}