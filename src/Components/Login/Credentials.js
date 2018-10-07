
export default class Credentials {

    credentialsDict = {
        'user': 'pass'
    }

    PasswordMatches(username, password) {
        return this.credentialsDict[username] === password
    }
}