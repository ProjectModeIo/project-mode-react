import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { push } from 'react-router-redux'
import Nav from './components/nav'
import ErrorMessage from './components/errormessage.js'
import RouteHandler from './RouteHandler'

import { clearUser, logout, setUser, loadDefaultView } from './actions/sessionsregistration' // session actions

class App extends Component {

  componentWillMount(){
    if (this.props.token) {
      this.props.setUser(this.props.token)
    } else {
      this.props.loadDefaultView()
    }
  }

  render() {
    let {error} = this.props.status
    return (
      <div className="App">
        <Nav />
        <RouteHandler
          location={this.props.location}
          loaded={this.props.loginStatus.loaded}
          loggedIn={this.props.loginStatus.logged_in}
          />
        {error ? <ErrorMessage error={error} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount,
    loginStatus: state.manageLogin,
    token: state.manageLogin.token,
    status: state.manageStatus
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, loadDefaultView,
    clearUser, logout, setUser // session actions
  }, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
