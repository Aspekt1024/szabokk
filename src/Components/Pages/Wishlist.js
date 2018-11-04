import React, { Component } from 'react'
import WishlistItem from 'Components/Objects/WishlistItem'

class Wishlist extends Component {

    constructor(props) {
        super(props)

        this.state = {
            item1: new WishlistItem(),
            item2: new WishlistItem(),
            item3: new WishlistItem()
        }
    }

    render() {
        return (
            <div>
                Wishlist for {this.props.appState.currentUser.username}
                <form>
                    <label>Item 1:</label>
                    <input type='input' /><br />
                    <label>Link</label>
                    <input type='input' /><br />
                    <br />
                    <label>Item 2:</label>
                    <input type='input' /><br />
                    <label>Link</label>
                    <input type='input' /><br />
                    <br />
                    <label>Item 3:</label>
                    <input type='input' /><br />
                    <label>Link</label>
                    <input type='input' />

                </form>
            </div>
        )
    }
}

export default Wishlist