const RESOURCE = '/updatesentiment'

class ApiUpdateSentiment {

    apiURL = ''

    constructor (url) {
        this.apiURL = url
    }

    attemptUpdateSentiment = (username, sentiment, token, gotDataCallback, gotErrorCallback) => {

        fetch(this.apiURL + RESOURCE, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ username: username, sentiment: sentiment })
        })
            .then(response => {
                if (response.ok) {
                    gotDataCallback(response.body, null)
                } else {
                    throw new Error(response.status + ' : ' + response.statusText + ' ' + JSON.stringify(response))
                }
            })
            .catch(error => gotErrorCallback(error.message))
    }
}

export default ApiUpdateSentiment