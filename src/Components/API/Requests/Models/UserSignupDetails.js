// UserSignupDetails describes the data required for the signup API call
class UserSignupDetails {

    username = ''
    password = ''
    email = ''

    constructor(user, pass, email) {
        this.username = user
        this.password = pass
        this.email = email
    }

    getJSON() {
        return JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
        })
    }
}

export default UserSignupDetails