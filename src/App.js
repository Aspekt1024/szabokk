import React, { Component, Fragment } from 'react'
import Header from 'Components/Header'
import Main from 'Components/Main'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    return (
      <Fragment>

        <Header isLoggedIn={this.state.isLoggedIn}
                handleLogout={this.handleLogout}
                handleLogin={this.handleLogin} />

        <Main isLoggedIn={this.state.isLoggedIn} />

      </Fragment>
    )
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true })
  }

  handleLogout = () => {
    this.setState({ isLoggedIn: false })
  }
}

export default App
