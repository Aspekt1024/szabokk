import ApiLogin from './Requests/ApiLogin'
import ApiSignup from './Requests/ApiSignup'
import ApiGetWishlist from './Requests/ApiGetWishlist'
import ApiUpdateWishlist from './Requests/ApiUpdateWishlist'
import ApiGetAssignment from './Requests/ApiGetAssignment'

import WishlistDetails from './Requests/Models/WishlistDetails'

const API_URL = 'https://41b50mfzy7.execute-api.ap-southeast-2.amazonaws.com/dev'

class KKApi {

    constructor() {
        this.state = {
            token: '',
            loginHandler: new ApiLogin(API_URL),
            signupHandler: new ApiSignup(API_URL),
            getWishlistHandler: new ApiGetWishlist(API_URL),
            updateItemHandler: new ApiUpdateWishlist(API_URL),
            getAssignmentHandler: new ApiGetAssignment(API_URL)
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

    getWishlist = (username, gotDataCallback, gotErrorCallback) => {
        this.state.getWishlistHandler.attemptGetWishlist(
            username,
            this.state.token,
            gotDataCallback,
            gotErrorCallback
        )
    }

    updateWishlistItem = (itemDetails, gotSuccessCallback, gotErrorCallback) => {
        var data = new WishlistDetails(
            itemDetails.username,
            itemDetails.number
        )

        data.item = itemDetails.item
        data.link = itemDetails.link
        data.comment = itemDetails.comment

        this.state.updateItemHandler.attemptUpdateWishlist(
            data,
            this.state.token,
            gotSuccessCallback,
            gotErrorCallback
        )
    }

    getAssignment = (username, gotDataCallback, gotErrorCallback) => {
        this.state.getAssignmentHandler.attemptGetAssignment(
            username,
            this.state.token,
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