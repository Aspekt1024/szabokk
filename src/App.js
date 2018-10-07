import React, { Component, Fragment } from 'react'
import Header from 'Components/Header'
import Main from 'Components/Main'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      loginRequested: false
    }
  }

  render() {
    return (
      <Fragment>

        <Header isLoggedIn={this.state.isLoggedIn}
                handleLogout={this.handleLogout}
                requestLogin={this.requestLogin} />

        <Main isLoggedIn={this.state.isLoggedIn}
              loginRequested={this.state.loginRequested}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout} />

      </Fragment>
    )
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true })
    this.setState({ loginRequested: false })
  }

  handleLogout = () => {
    this.setState({ isLoggedIn: false })
  }

  requestLogin = () => {
    this.setState({ loginRequested: true })
  }
}

export default App
