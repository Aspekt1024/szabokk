import React, { Component } from 'react'
import Signup from 'Components/UserAuthorization/Signup'

class Main extends Component {
  render() {
    return (
      <div className="main-status">
        <h1>Main</h1>
        {this.props.isLoggedIn ?
          <div>logged in</div>
        :
          <div>
            <Signup api={ this.props.api } />
          </div>
        }
      </div>
    )
  }
}

export default Main
