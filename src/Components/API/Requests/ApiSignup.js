const SIGNUP_RESOURCE = '/signup'

class ApiSignup {

    apiURL = ''

    constructor (url) {
        this.apiURL = url
    }

    attemptSignup(signupDetails, gotDataCallback, gotErrorCallback) {
        fetch(this.apiURL + SIGNUP_RESOURCE, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: signupDetails.getJSON()
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status + ' : ' + response.statusText + ' ' + JSON.stringify(response))
                }
            })
            .then(data => {
                this.processData(data, gotDataCallback)
            })
            .catch(error => gotErrorCallback(error.message))
    }

    processData = (data, gotDataCallback, gotTokenCallback) => {
        var message = ''
        var err = ''
        switch(data.status) {
            case '200':
                message = 'You have signed up! A verification email was sent to you. Please click the link in it to verify your account, then log in!'
                break
            case '211':
                err = 'User already exists'
                break
            default:
                alert(JSON.stringify(data))
                err = data.status
                message = data.body
                break
        }
        gotDataCallback(message, err)
    }
}

export default ApiSignup