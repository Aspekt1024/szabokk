import React, { Component, Fragment } from 'react'
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
            <form className='kk-form kk-form-wishlist'>
                {this.state.isLoading ?
                    <div>
                        Loading your wishlist...
                    </div>
                :
                    <Fragment>
                        <h1>My Wishlist</h1>
                        <div className='wishlist-comment'>This is what your Secret Santa will see!</div>
                        <br />
                        <WishlistItem
                            isEditable={true}
                            appState={this.props.appState}
                            itemDetails={this.state.wishlist[0]}
                            handleItemUpdate={this.populateItem}
                            isWishlistUpdating={this.state.isRequestingUpdate} />
                        <WishlistItem
                            isEditable={true}
                            appState={this.props.appState}
                            itemDetails={this.state.wishlist[1]}
                            handleItemUpdate={this.populateItem}
                            isWishlistUpdating={this.state.isRequestingUpdate} />
                        <WishlistItem
                            isEditable={true}
                            appState={this.props.appState}
                            itemDetails={this.state.wishlist[2]}
                            handleItemUpdate={this.populateItem}
                            isWishlistUpdating={this.state.isRequestingUpdate} />
                    </Fragment>
                }
            </form>
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
}

export default Wishlist