import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Route, Switch, Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import ProjectFeed from './components/projectfeed'
import Nav from './components/nav'
import RouteHandler from './RouteHandler'

import { clearUser, logout, setUser, loadDefaultView } from './actions/sessionsregistration' // session actions
class App extends Component {
  constructor(prop) {
    super(prop)
  }

  componentWillMount(){
    if (this.props.token) {
      this.props.setUser(this.props.token)
    } else {
      this.props.loadDefaultView()
    }
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <RouteHandler
          loaded={this.props.loginStatus.loaded}
          loggedIn={this.props.loginStatus.logged_in}
          />
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
