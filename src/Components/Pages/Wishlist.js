import React, { Component } from 'react'
import WishlistItem from 'Components/Wishlist/WishlistItem'

class Wishlist extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false
        }
    }

    render() {
        return (
            <div>
                Wishlist for {this.props.appState.currentUser.username}
                <form>
                    <WishlistItem itemNumber='1'/>
                    <br />
                    <WishlistItem itemNumber='2'/>
                    <br />
                    <WishlistItem itemNumber='3'/>
                    <br />
                </form>
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
        api.getWishlist(this.props.appState.currentUser.username, this.gotResponse, this.gotError)
    }

    gotResponse = (message, err) => {
        this.setState({ isLoading: false })
        if (err === '') {
            var json = JSON.parse(message)
            alert(json)
        } else {
            this.gotError(err)
        }
    }

    gotError = (err) => {
        this.setState({ isLoading: false })
        alert(err)
    }
}

export default Wishlist