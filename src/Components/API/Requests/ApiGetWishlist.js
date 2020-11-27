const RESOURCE = '/getwishlist'

class ApiGetWishlist {

    apiURL = ''

    constructor (url) {
        this.apiURL = url
    }

    attemptGetWishlist = (username, token, gotDataCallback, gotErrorCallback) => {

        fetch(this.apiURL + RESOURCE + '?user=' + username, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status + ' : ' + response.statusText + ' ' + JSON.stringify(response))
                }
            })
            .then(data => {
                gotDataCallback(data, null)
            })
            .catch(error => gotErrorCallback(error.message))
    }
}

export default ApiGetWishlist