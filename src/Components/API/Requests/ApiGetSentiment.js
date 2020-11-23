const RESOURCE = '/getsentiment'

class ApiGetSentiment {

    apiURL = ''

    constructor (url) {
        this.apiURL = url
    }

    attemptGetSentiment = (username, token, gotDataCallback, gotErrorCallback) => {

        fetch(this.apiURL + RESOURCE + '?user=' + username, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else if (response.status === 404) {
                    return ''
                } else {
                    throw new Error(response.status + ' : ' + response.statusText + ' ' + JSON.stringify(response))
                }
            })
            .then(sentiment => {
                gotDataCallback(sentiment)
            })
            .catch(error => gotErrorCallback(error.message))
    }
}

export default ApiGetSentiment