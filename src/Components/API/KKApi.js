import ApiLogin from './Requests/ApiLogin'
import ApiSignup from './Requests/ApiSignup'

const API_URL = 'https://41b50mfzy7.execute-api.ap-southeast-2.amazonaws.com/dev'

class KKApi {

    constructor() {
        this.state = {
            token: '',
            loginHandler: new ApiLogin(API_URL),
            signupHandler: new ApiSignup(API_URL)
        }
    }

    requestLogin = (user, gotDataCallback, gotErrorCallback) => {
        this.state.loginHandler.attemptLogin(
            user,
            gotDataCallback,
            gotErrorCallback,
            this.gotTokenCallback
        )
    }

    requestSignup = (signupDetails, gotDataCallback, gotErrorCallback) => {
        this.state.signupHandler.attemptSignup(
            signupDetails,
            gotDataCallback,
            gotErrorCallback
        )
    }

    gotTokenCallback = (result) => {
        var json = JSON.parse(result)
        this.state.token = json.token
    }
}

export default KKApi