import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { push } from 'react-router-redux'
import Nav from './components/nav'
import ErrorMessage from './components/errormessage.js'
import Notifications from './components/notifications.js'
import RouteHandler from './RouteHandler'

import { clearUser, logout, setUser, loadAllThings, connectToSocket } from './actions/sessionsregistration' // session actions
import { listSkills } from './actions/skills'
import { listRoles } from './actions/roles'
import { listInterests } from './actions/interests'

class App extends Component {

  componentWillMount(){
    if (this.props.token) {
      this.props.setUser(this.props.token)
      this.props.connectToSocket()
    }

    /* get the code query param from github */
    window.localStorage.setItem('github_code', this.props.location.search);

    /* load all the things!! */
    this.props.loadAllThings();
    // eventually move these to loadAllThings maybe...
    this.props.listSkills();
    this.props.listRoles();
    this.props.listInterests();
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.location !== this.props.location ||
      nextProps.loginStatus.loaded !== this.props.loginStatus.loaded ||
      nextProps.loginStatus.logged_in !== this.props.loginStatus.logged_in)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.token && nextProps.token) {
      this.props.connectToSocket();
    }
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <RouteHandler
          location={this.props.location}
          loaded={this.props.loginStatus.loaded}
          loggedIn={this.props.loginStatus.logged_in}
          />
        <Notifications />
        <ErrorMessage />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    loginStatus: state.manageLogin,
    token: state.manageLogin.token
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, loadAllThings, connectToSocket,
    listSkills, listRoles, listInterests, // list all the things
    clearUser, logout, setUser // session actions
  }, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
