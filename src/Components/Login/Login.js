import React, { Component } from 'react'
import Credentials from './Credentials'
import LoginButton from '../Buttons/LoginButton'

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
            <div>
                {this.props.isLoggedIn ?
                    <div>hello, user</div> //TODO create user variable
                :
                    <form onSubmit={this.handleSubmit}>
                        User:
                        <input type="text" value={this.state.userInput} onChange={this.handleUserInputChange} />
                        Pass:
                        <input type="password" value={this.state.passInput} onChange={this.handlePassInputChange} />
                    </form>
                }
                <LoginButton isLoggedIn={this.props.isLoggedIn} handleSubmit={this.handleSubmit} handleLogin={this.props.handleLogin} handleLogout={this.props.handleLogout} />
                {this.state.loginMessage}
            </div>
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
            this.setState({ loginMessage: '' })
            this.setState({ userInput: '' })
            this.setState({ passInput: '' })
            this.props.handleLogin()
        }
        else {
            this.setState({ loginMessage: 'Invalid Credentials' })
        }
    }
}