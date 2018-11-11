import React, { Component } from 'react'

export default class Button extends Component {

    render() {
        return (
            <span className="kk-button" onClick={this.props.onClick} >
                {this.props.content}
            </span>
        )
    }
}