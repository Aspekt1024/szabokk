import React, { Component } from 'react'
import UserSignupDetails from '../API/Requests/Models/UserSignupDetails'

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
            isLoading: false
        }
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit } className='login login-form'>
            <h1>Signup</h1>
                <label>Username: </label>
                <input type='input' value={ this.state.username } onChange={ this.handleUsernameChange } />
                <br />
                <label>Email: </label>
                <input type='input' value={ this.state.email } onChange={ this.handleEmailChange } />
                <br />
                <label>Password: </label>
                <input type='password' value={ this.state.password1 } onChange={ this.handlePassword1Change } />
                <br />
                <label>Confirm Password: </label>
                <input type='password' value={ this.state.password2 } onChange={ this.handlePassword2Change } />
                <br />
                { this.state.isLoading ?
                    <div></div>
                :
                    <input type='submit' value='Sign Up!' className='login-button' />
                }
            </form>
        )
    }

    handleUsernameChange = ({ target }) => {
        this.setState({ username: target.value })
    }

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value })
    }

    handlePassword1Change = ({ target }) => {
        this.setState({ password1: target.value })
    }

    handlePassword2Change = ({ target }) => {
        this.setState({ password2: target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        var err = this.checkValidInputs(this.state.username, this.state.email, this.state.password1, this.state.password2)
        if (err !== '') {
            alert(err)
            return
        }

        var signupDetails = new UserSignupDetails(
            this.state.username,
            this.state.password1,
            this.state.email
        )
        this.setState({ isLoading: true })
        this.props.api.requestSignup(signupDetails, this.gotSignupResponse, this.gotSignupError)
    }

    checkValidInputs(username, email, password1, password2) {
        if (username == null || username === '') {
            return 'Username cannot be blank'
        } else if (!this.isEmailValid(email)) {
            return 'invalid email address'
        } else if (password1.length < 8) {
            return 'password must be at least 8 characters'
        } else if (password1 !== password2) {
            return 'passwords do not match'
        }
        return ''
    }

    gotSignupResponse = (message, error) => {
        if (error !== '') {
            alert(error)
        } else {
            alert(message)
        }
    }

    gotSignupError = (error) => {
        alert(error)
    }

    isEmailValid(email) {
        if (email == null || email === '') {
            return false
        }
        var regex = /\w@\w+.\w/g   // something@somewhere.com
        var found = email.match(regex)
        return found != null && found !== ''
    }
}

export default Signup
