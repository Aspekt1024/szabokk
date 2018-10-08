import React, { Component, Fragment } from 'react'

export default class Home extends Component {

    render() {
        return (
            <Fragment>
                <div>Home page</div>
                <div>
                    {this.props.isLoggedIn ?
                        <div>you're logged in</div>
                    :
                        <div>you're not logged in</div>
                    }
                </div>
            </Fragment>
        )
    }
}