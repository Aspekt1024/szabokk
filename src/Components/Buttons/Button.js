import React, { Component } from 'react'

export default class Button extends Component {

    render() {
        return (
            <div className="kk-button" onClick={this.props.handleClick} >
                {this.props.content}
            </div>
        )
    }
}