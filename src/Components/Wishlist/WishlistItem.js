import React, { Fragment, Component } from 'react'

class WishlistItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isUserUpdating: false,
            isSaving: false,
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
            <form className='kk-form wishlist-item'>
                <h1>Item {this.props.itemNumber}</h1>
                {this.state.isUserUpdating ?
                    <Fragment>
                        <label>Description:</label>
                        <input type='input' value={editDetails.item} onChange={this.handleItemChange} />
                        <label>Link: </label>
                        <input type='input' value={editDetails.link} onChange={this.handleLinkChange} />
                        <label>Comments: </label>
                        <input type='input' value={editDetails.comment} onChange={this.handleCommentChange} />
                        <div className='wishlist-buttons'>
                            <input type='submit'
                                className={this.state.isSaving ? 'kk-button-disabled' : 'kk-button'}
                                value='Save'
                                onClick={this.handleSaveClicked} />
                            <input type='submit'
                                className={this.state.isSaving ? 'kk-button-disabled' : 'kk-button'}
                                value='Cancel'
                                onClick={this.handleCancelClicked} />
                        </div>
                    </Fragment>
                :
                    <Fragment>
                        {storedDetails.item === '' ?
                            <Fragment>
                                {this.props.isEditable ?
                                    <Fragment>
                                        <div className='wishlist-comment'>You haven't entered anything for this item!</div>
                                        <div className='wishlist-buttons'>
                                            <input type='submit' className='kk-button' value='Create it!' onClick={this.handleEditClicked} />
                                        </div>
                                    </Fragment>
                                :
                                    <div className='wishlist-comment'>This item hasn't been entered</div>
                                }
                            </Fragment>
                        :
                            <Fragment>
                                <div className='wishlist-item-text'>{storedDetails.item}&nbsp;
                                    <a href={storedDetails.link} target='_blank'>
                                        {storedDetails.link === '' ?
                                            <label></label>
                                        :
                                            <a href={storedDetails.link} target='_blank'>(link)</a>
                                        }
                                    </a>
                                </div>
                                <div className='wishlist-comment'>{storedDetails.comment}</div>
                                {this.props.isEditable ?
                                    <div className='wishlist-buttons'>
                                        <input type='submit' className='kk-button' value='Edit' onClick={this.handleEditClicked} />
                                    </div>
                                :
                                    <div></div>
                                }
                            </Fragment>
                        }
                    </Fragment>
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
        if (!this.props.appState.isLoggedIn) return

        var pattern = /https?:\/\/\w+.\w+/g
        var details = this.state.itemDetails
        var found = details.link.match(pattern)
        if (found == null || found ==='') {
            details.link = 'http://' + details.link
            this.setState({ itemDetails: details })
        }

        this.setState({ isSaving: true })
        var api = this.props.appState.api
        api.updateWishlistItem(this.state.itemDetails, this.gotUpdateResponse, this.gotUpdateError)
        this.props.handleItemUpdate(this.state.itemDetails)
    }

    gotUpdateResponse = (response, err) => {
        this.setState({ isUserUpdating: false })
        this.setState({ isSaving: false })
        if (err !== '') {
            this.gotError(err)
        }
    }

    gotUpdateError = (err) => {
        this.setState({ isUserUpdating: false })
        this.setState({ isSaving: false })
        //TODO find source of error even with success
        //TODO alert user that save was unsuccessful and to try again!
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