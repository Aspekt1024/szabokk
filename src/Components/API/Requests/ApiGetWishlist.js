const RESOURCE = '/getwishlist'

class ApiGetWishlist {

    apiURL = ''

    constructor (url) {
        this.apiURL = url
    }

    attemptGetWishlist = (username, token, gotDataCallback, gotErrorCallback) => {

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
        var message = data.body
        var err = data.status
        switch(data.status) {
            case '200':
                err = ''
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

export default ApiGetWishlist