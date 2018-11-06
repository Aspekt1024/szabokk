import React, { Component } from 'react'

class WishlistItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isUserUpdating: false,
            itemDetails : {
                username: '',
                number: '',
                item: '',
                link: '',
                comment: ''
            }
        }
    }

    render() {
        var storedDetails = this.props.itemDetails
        var editDetails = this.state.itemDetails
        return (
            <form className='main-status'>
                <div>
                    <label>Item {this.props.itemNumber}: </label><br />
                    <label>Link: </label><br />
                    <label>Comments: </label><br />
                </div>
                {this.state.isUserUpdating ?
                    <div>
                        <div>
                            <input type='input' value={editDetails.item} onChange={this.handleItemChange} /><br />
                            <input type='input' value={editDetails.link} onChange={this.handleLinkChange} /><br />
                            <input type='input' value={editDetails.comment} onChange={this.handleCommentChange} /><br />
                        </div>
                        <div>
                            <input type='submit' value='Save' onClick={this.handleSaveClicked} />
                            <input type='submit' value='Cancel' onClick={this.handleCancelClicked} />
                        </div>
                    </div>
                :
                    <div>
                        <div>
                            {storedDetails.item}<br />
                            {storedDetails.link}<br />
                            {storedDetails.comment}<br />
                        </div>
                        <div>
                            <input type='submit' value='Edit' onClick={this.handleEditClicked} />
                        </div>
                    </div>
                }
            </form>
        )
    }

    handleEditClicked = e => {
        e.preventDefault()
        this.setState({ isUserUpdating: true })
        this.setState({ itemDetails: this.props.itemDetails })
    }

    handleSaveClicked = e => {
        e.preventDefault()
        this.setState({ isUserUpdating: false })
        this.props.handleItemUpdate(this.state.itemDetails)
    }

    handleCancelClicked = e => {
        e.preventDefault()
        this.setState({ isUserUpdating: false })
    }

    handleItemChange = ({ target }) => {
        var item = this.state.itemDetails
        item.item = target.value
        this.setState({ itemDetails: item })
    }

    handleLinkChange = ({ target }) => {
        var item = this.state.itemDetails
        item.link = target.value
        this.setState({ itemDetails: item })
    }

    handleCommentChange = ({ target }) => {
        var item = this.state.itemDetails
        item.comment = target.value
        this.setState({ itemDetails: item })
    }
}
export default WishlistItem