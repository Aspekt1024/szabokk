import React, { Component } from 'react'
import WishlistItemData from '../../Objects/WishlistItemData'

class WishlistItem extends Component {

    constructor(props) {
        super(props)

        var item = new WishlistItemData()
        item.item = 'test item'
        item.link = 'http://google.com'
        item.comment = 'this is a test item'

        this.state = {
            item: new WishlistItemData()
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Item {this.props.itemNumber}: </label>
                <input type='input' onChange={this.handleItemChange} value={this.state.item.item} /><br />
                <label>Link: </label>
                <input type='input' onChange={this.handleLinkChange} value={this.state.item.link} /><br />
                <label>Comments: </label>
                <input type='input' onChange={this.handleCommentChange} value={this.state.item.comment} /><br />
            </form>
        )
    }

    handleSubmit = e => {
        e.preventDefault()

    }

    handleItemChange = ({ itemText }) => {
        var item = this.state.item
        item.item = itemText
        this.setState({ item: item })
    }

    handleLinkChange = ({ itemText }) => {
        var item = this.state.item
        item.link = itemText
        this.setState({ item: item })
    }

    handleCommentChange = ({ itemText }) => {
        var item = this.state.item
        item.comment = itemText
        this.setState({ item: item })
    }
}
export default WishlistItem