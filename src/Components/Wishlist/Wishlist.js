import React, { Component } from 'react'
import WishlistItem from 'Components/Wishlist/WishlistItem'
import WishlistDetails from 'Components/API/Requests/Models/WishlistDetails'

class Wishlist extends Component {

    constructor(props) {
        super(props)

        var username = this.props.appState.currentUser.username

        this.state = {
            isLoading: false,
            isRequestingUpdate: false,
            wishlist: [
                new WishlistDetails(username, 1),
                new WishlistDetails(username, 2),
                new WishlistDetails(username, 3)
            ]
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoading ?
                    <div>
                        Loading...
                    </div>
                :
                    <div>
                        Wishlist for {this.props.appState.currentUser.username}
                        <br /><br />
                        <form>
                            <WishlistItem
                                itemDetails={this.state.wishlist[0]}
                                handleItemUpdate={this.handleItemUpdate}
                                isWishlistUpdating={this.state.isRequestingUpdate} />
                            <br />
                            <WishlistItem
                                itemDetails={this.state.wishlist[1]}
                                handleItemUpdate={this.handleItemUpdate}
                                isWishlistUpdating={this.state.isRequestingUpdate} />
                            <br />
                            <WishlistItem
                                itemDetails={this.state.wishlist[2]}
                                handleItemUpdate={this.handleItemUpdate}
                                isWishlistUpdating={this.state.isRequestingUpdate} />
                            <br />
                        </form>
                    </div>
                }
            </div>
        )
    }

    componentDidMount() {
        var username = this.props.appState.currentUser.username
        if (username == null || username === '') {
            return
        }

        this.setState({ isLoading: true })
        var api = this.props.appState.api

        api.getWishlist(
            this.props.appState.currentUser.username,
            this.gotWishlistResponse,
            this.gotWishlistError
        )
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

    populateWishlistDetails = (wishlistArray) => {
        var parsedWishlist = JSON.parse(wishlistArray)
        for (var i in parsedWishlist) {
            this.populateItem(parsedWishlist[i])
        }
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

    handleItemUpdate = (details) => {
        if (!this.props.appState.isLoggedIn) return

        this.populateItem(details)

        this.setState({ isRequestingUpdate: true })
        var api = this.props.appState.api
        api.updateWishlistItem(details, this.gotUpdateResponse, this.gotUpdateError)
    }

    gotUpdateResponse = (response, err) => {
        this.setState({ isRequestingUpdate: false })
        if (err !== '') {
            this.gotError(err)
        }
    }

    gotUpdateError = (err) => {
        //TODO find source of error even with success
    }
}

export default Wishlist