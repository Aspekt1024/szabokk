import React, { Component, Fragment } from 'react'
import WishlistItem from 'Components/Wishlist/WishlistItem'
import WishlistDetails from 'Components/API/Requests/Models/WishlistDetails'
import Sentiment from '../Sentiment'

class MyKK extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isWishlistLoaded: false,
            isSentimentLoaded: false,
            isSentimentValid: false,
            isShowingWishlist: false,
            sentiment: '',
            wishlist: [
                new WishlistDetails('', 1),
                new WishlistDetails('', 2),
                new WishlistDetails('', 3)
            ]
        }
    }

    componentWillMount = () => {
        if (!this.props.isLoggedIn) {
            window.location.hash = '/'
        }
    }

    render() {
        var details = this.props.appState.assignmentDetails
        var assignedKK = details.assignedKK

        const {
            state : { isSentimentValid, isSentimentLoaded }
        } = this

        return (
            <div className='page'>
                {details.isAssignmentLoaded ?
                    <Fragment>
                        {details.isAssignmentPending ?
                            <h1>KKs have not been assigned yet!</h1>
                        :
                            <Fragment>
                                <h1>Your KK is {assignedKK.username}</h1>
                                <Sentiment
                                    user={assignedKK.username}
                                    appState={this.props.appState}
                                    onSentimentLoaded={(sentiment) => this.setState({ isSentimentValid: sentiment !== '', isSentimentLoaded: true })}
                                />
                                { isSentimentValid ?
                                    <Fragment>
                                        { this.renderWishlist() }
                                    </Fragment>
                                :
                                    isSentimentLoaded ?
                                        <div className='sentiment-tutorial-text'>
                                            Wishlist details will be available after you've entered a message above.
                                        </div>
                                    :
                                        <Fragment />
                                }
                            </Fragment>
                        }
                    </Fragment>
                :
                    <h1>Loading KK details...</h1>
                }
            </div>
        )
    }

    renderWishlist = () => {

        const {
            state : { isWishlistLoaded, wishlist, isShowingWishlist }
        } = this

        return (
            <div className='wishlist-parent'>
                <input type='submit'
                    className='kk-button wishlist-button-center'
                    value={isShowingWishlist ? 'Hide Wishlist' : 'Show Wishlist'}
                    onClick={isShowingWishlist ? this.handleHideWishlist : this.handleShowWishlist}
                />
                {this.state.isShowingWishlist ?
                    <div className='wishlist'>
                        { !isWishlistLoaded ?
                            <div>
                                Loading wishlist...
                            </div>
                        :
                            <Fragment>
                                <WishlistItem
                                    isEditable={false}
                                    appState={this.props.appState}
                                    itemDetails={wishlist[0]}
                                    handleItemUpdate={this.populateItem}
                                    isWishlistUpdating={this.state.isRequestingUpdate} />
                                <WishlistItem
                                    isEditable={false}
                                    appState={this.props.appState}
                                    itemDetails={wishlist[1]}
                                    handleItemUpdate={this.populateItem}
                                    isWishlistUpdating={this.state.isRequestingUpdate} />
                                <WishlistItem
                                    isEditable={false}
                                    appState={this.props.appState}
                                    itemDetails={wishlist[2]}
                                    handleItemUpdate={this.populateItem}
                                    isWishlistUpdating={this.state.isRequestingUpdate} />
                            </Fragment>
                        }
                    </div>
                :
                    <div className='wishlist-comment'>
                        Wishlist is hidden. Click the 'Show Wishlist' button to see it!
                    </div>
                }
            </div>
        )
    }

    componentDidMount() {
        var assignedKK = this.props.appState.assignmentDetails.assignedKK
        var username = assignedKK.username
        if (username == null || username === '') {
            return
        }

        this.setState({ isLoading: true })
        var api = this.props.appState.api

        api.getWishlist(
            username,
            this.gotWishlistResponse,
            this.gotWishlistError
        )
    }

    populateWishlistDetails = (wishlistArray) => {
        for (var i in wishlistArray) {
            this.populateItem(wishlistArray[i])
        }
    }

    gotWishlistResponse = (message, err) => {
        this.setState({ isWishlistLoaded: true })
        if (err === null) {
            this.populateWishlistDetails(message)
        } else {
            alert(err)
        }
    }

    gotWishlistError = (err) => {
        this.setState({ isWishlistLoaded: true })
        alert(err)
    }

    populateItem = (details) => {
        var index = details.number - 1
        var wishlist = this.state.wishlist
        var wishlistItem = wishlist[index]

        wishlistItem.username = details.username
        wishlistItem.number = details.number
        wishlistItem.item = details.item
        wishlistItem.link = details.link
        wishlistItem.comment = details.comment

        wishlist[index] = wishlistItem
        this.setState({ wishlist: wishlist })
    }

    handleShowWishlist = e => {
        e.preventDefault()
        this.setState({ isShowingWishlist: true })
    }

    handleHideWishlist = e => {
        e.preventDefault()
        this.setState({ isShowingWishlist: false })
    }
}

export default MyKK