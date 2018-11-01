// UserLoginDetails describes the data required for the login API call
class UserLoginDetails {
    username = ''
    password = ''

    getJSON() {
        return JSON.stringify({
            username: this.username,
            password: this.password
        })
    }
}

export default UserLoginDetails