import React, { Component, Fragment } from 'react'
import Credentials from './Credentials'
import Button from '../Buttons/Button'

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
            <Fragment>
                {this.props.isLoggedIn ?
                    <label>hello, user</label> //TODO create user variable
                :
                    <Fragment>
                        <label>User:</label>
                        <input type="text"
                                value={this.state.userInput}
                                onChange={this.handleUserInputChange}
                                onKeyDown={this.submitOnEnterPressed} />

                        <label>Pass:</label>
                        <input type="password"
                                value={this.state.passInput}
                                onChange={this.handlePassInputChange}
                                onKeyDown={this.submitOnEnterPressed} />
                    </Fragment>
                }
                <Button content={this.props.isLoggedIn ? 'Logout' : 'Login' }
                        handleClick={this.props.isLoggedIn ? this.props.handleLogout : this.props.handleSubmit}
                />
            </Fragment>
        )
    }

    submitOnEnterPressed = (e) => {
        var enterKey = 13
        if (e.keyCode === enterKey) {
            this.checkCredentials()
        }
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
        this.checkCredentials()
        event.preventDefault()
    }

    checkCredentials() {
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