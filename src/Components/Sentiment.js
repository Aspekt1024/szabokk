import React, { Fragment, Component } from 'react'

class Sentiment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            isUserUpdating: false,
            isSaving: false,
            sentiment: '',
            storedSentiment: ''
        }
    }

    componentDidMount = () => {
        this.props.appState.api.getSentiment(
            this.props.user,
            this.onMessageLoaded,
            this.gotSentimentError
        )
    }

    onMessageLoaded = (sentiment) => {
        this.setState({
            isLoading: false,
            sentiment: sentiment,
            storedSentiment: sentiment
         })

        this.props.onSentimentLoaded(sentiment)
        if (this.state.sentiment === '') {
            this.setState({ isUserUpdating: true })
        }
    }

    gotSentimentError = (err) => {
        this.setState({ isSentimentLoaded: true, sentiment: '', storedSentiment: '' })
        alert(err)
    }

    render() {

        const {
            props : { user },
            state : { isUserUpdating, isSaving, sentiment, isLoading }
        } = this

        if (isLoading) {
            return (
                <div className='kk-form wishlist-item sentiment'>
                    <div className='wishlist-item-text'>Loading message...</div>
                </div>
            )
        }

        if (isSaving) {
            return (
                <div className='kk-form wishlist-item sentiment'>
                    <div className='wishlist-item-text'>Saving message...</div>
                </div>
            )
        }

        return (
            <form className='kk-form wishlist-item sentiment'>
                {isUserUpdating ?
                    <Fragment>
                        <div className='sentiment-tutorial-text'>
                            Enter a memory you have of {user} to help them guess who their KK is on Christmas.
                        </div>
                        <label>Your Message: </label>
                        <input type='input' value={sentiment} onChange={this.handleMessageChange} />
                        <div className='wishlist-buttons'>
                            <input type='submit'
                                className={isSaving ? 'kk-button-disabled' : 'kk-button'}
                                value='Save'
                                onClick={this.handleSaveClicked} />
                            <input type='submit'
                                className={isSaving ? 'kk-button-disabled' : 'kk-button'}
                                value='Cancel'
                                onClick={this.handleCancelClicked} />
                        </div>
                    </Fragment>
                :
                    <div className='wishlist-item-text'>
                        <div className='sentiment-message-heading'>Your message</div>
                        <div>{ sentiment }</div>
                        <div>
                            <input type='submit' className='kk-button' value='Edit' onClick={this.handleEditClicked} />
                        </div>
                    </div>
                }
            </form>
        )
    }

    handleEditClicked = e => {
        e.preventDefault()
        this.setState({ isUserUpdating: true })
    }

    handleSaveClicked = e => {
        e.preventDefault()
        if (!this.props.appState.isLoggedIn || this.state.sentiment === '') return

        this.setState({ isSaving: true })
        var api = this.props.appState.api

        api.updateSentiment(
            this.props.user,
            this.state.sentiment,
            this.gotUpdateResponse,
            this.gotUpdateError)
    }

    gotUpdateResponse = (response, err) => {
        this.setState({ storedSentiment: this.state.sentiment })
        this.props.onSentimentLoaded(this.state.sentiment)
        this.setState({ isUserUpdating: false, isSaving: false })
    }

    gotUpdateError = (err) => {
        alert('update failed ' + JSON.stringify(err))
        this.setState({ isUserUpdating: false, isSaving: false, sentiment: this.state.storedSentiment })
    }

    handleCancelClicked = e => {
        e.preventDefault()
        if (this.state.storedSentiment === '') {
            return
        }
        this.setState({ isUserUpdating: false, sentiment: this.state.storedSentiment })
    }

    handleMessageChange = ({ target }) => {
        this.setState({ sentiment: target.value })
    }
}
export default Sentiment