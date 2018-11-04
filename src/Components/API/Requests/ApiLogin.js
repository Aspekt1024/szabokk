const LOGIN_RESOURCE = '/login'

class ApiLogin {

    apiURL = ''

    constructor (url) {
        this.apiURL = url
    }

    attemptLogin = (user, gotDataCallback, gotErrorCallback, gotTokenCallback) => {

        fetch(this.apiURL + LOGIN_RESOURCE, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: user.getJSON()
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status + ' : ' + response.statusText + ' ' + JSON.stringify(response))
                }
            })
            .then(data => {
                this.processData(data, gotDataCallback, gotTokenCallback)
            })
            .catch(error => gotErrorCallback(error.message))
    }

    processData = (data, gotDataCallback, gotTokenCallback) => {
        var message = data.body
        var err = data.status

        switch(data.status) {
            case '200':
                gotTokenCallback(data.body)
                err = ''
                break
            default:
                break
        }
        gotDataCallback(message, err)
    }
}

export default ApiLogin