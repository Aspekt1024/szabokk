import React, { Component, Fragment } from 'react'
import WishlistItem from 'Components/Wishlist/WishlistItem'
import WishlistDetails from 'Components/API/Requests/Models/WishlistDetails'

class MyKK extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            isShowingWishlist: false,
            wishlist: [
                new WishlistDetails('', 1),
                new WishlistDetails('', 2),
                new WishlistDetails('', 3)
            ]
        }
    }

    render() {
        var details = this.props.appState.assignmentDetails
        var assignedKK = details.assignedKK
        return (
            <form className='kk-form kk-form-wishlist'>
                {details.isAssignmentLoaded ?
                    <Fragment>
                        {details.isAssignmentPending ?
                            <h1>KKs have not been assigned yet!</h1>
                        :
                            <Fragment>
                                <h1>Your KK is {assignedKK.username}</h1>
                                <input type='submit'
                                    className='kk-button'
                                    value={this.state.isShowingWishlist ? 'Hide Wishlist' : 'Show Wishlist'}
                                    onClick={this.state.isShowingWishlist ? this.handleHideWishlist : this.handleShowWishlist}
                                />
                                {this.state.isShowingWishlist ?
                                    <Fragment>
                                        {this.state.isLoading ?
                                            <div>
                                                Loading wishlist...
                                            </div>
                                        :
                                            <Fragment>
                                                <WishlistItem
                                                    isEditable={false}
                                                    appState={this.props.appState}
                                                    itemDetails={this.state.wishlist[0]}
                                                    handleItemUpdate={this.populateItem}
                                                    isWishlistUpdating={this.state.isRequestingUpdate} />
                                                <WishlistItem
                                                    isEditable={false}
                                                    appState={this.props.appState}
                                                    itemDetails={this.state.wishlist[1]}
                                                    handleItemUpdate={this.populateItem}
                                                    isWishlistUpdating={this.state.isRequestingUpdate} />
                                                <WishlistItem
                                                    isEditable={false}
                                                    appState={this.props.appState}
                                                    itemDetails={this.state.wishlist[2]}
                                                    handleItemUpdate={this.populateItem}
                                                    isWishlistUpdating={this.state.isRequestingUpdate} />
                                            </Fragment>
                                        }
                                    </Fragment>
                                :
                                    <div className='wishlist-comment'>
                                        Wishlist is hidden. Click the 'Show Wishlist' button to see it!
                                    </div>
                                }
                            </Fragment>
                        }
                    </Fragment>
                :
                    <h1>Loading KK details...</h1>
                }
            </form>
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
        var parsedWishlist = JSON.parse(wishlistArray)
        for (var i in parsedWishlist) {
            this.populateItem(parsedWishlist[i])
        }
    }

    gotWishlistResponse = (message, err) => {
        this.setState({ isLoading: false })
        if (err === '') {
            this.populateWishlistDetails(message)
        } else {
            this.gotError(err)
        }
    }

    gotWishlistError = (err) => {
        this.setState({ isLoading: false })
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