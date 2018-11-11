const RESOURCE = '/getassignment'

class ApiGetWishlist {

    apiURL = ''

    constructor (url) {
        this.apiURL = url
    }

    attemptGetAssignment = (username, token, gotDataCallback, gotErrorCallback) => {

        fetch(this.apiURL + RESOURCE, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ username: username })
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

    processData = (data, gotDataCallback) => {
        var assignment = data.body
        var err = data.status
        switch(data.status) {
            case '200':
                err = ''
                break
            default:
                assignment = ''
                break
        }
        gotDataCallback(assignment, err)
    }
}

export default ApiGetWishlist