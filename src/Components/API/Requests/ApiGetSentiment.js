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
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
                this.processData(data, gotDataCallback)
            })
            .catch(error => gotErrorCallback(error.message))
    }

    processData = (data, gotDataCallback) => {
        var sentiment = data.body
        var err = data.status
        switch(data.status) {
            case '200':
                err = ''
                break
            default:
                sentiment = ''
                break
        }
        gotDataCallback(sentiment, err)
    }
}

export default ApiGetSentiment