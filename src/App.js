import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Route, Switch, Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import ProjectFeed from './components/projectfeed'
import Nav from './components/nav'
import Home from './components/home'
import Dashboard from './components/profile/dashboard'
import EditProfile from './components/profile/editprofile'
import Login from './components/sessionsregistration/login'
import Registration from './components/sessionsregistration/registration'
import NewProject from './components/projects/newproject'
// import EditProject from './components/projects/editproject'
import ShowProject from './components/projects/showproject'
import { clearUser, logout, setUser, loadDefaultView } from './actions/sessionsregistration' // session actions

class App extends Component {
  constructor(prop) {
    super(prop)
  }

  handleUser(prop){
    if (prop.token) {
      this.loggedInActions(prop)
    } else {
      this.notLoggedInActions(prop)
    }
  }

  loggedInActions(prop) {
    switch(prop.location.pathname) {
      case "/logout":
        prop.clearUser()
        prop.logout()
        prop.push('/login')
        return;
      case "/login":
      case "/register":
        prop.push('/');
        return;
      default:
        if (!prop.account || !prop.account.id) {
          prop.setUser(prop.token)
        }
    }
  }

  notLoggedInActions(prop) {
    // not logged in
    var loginOnly = [
      '/account/projects',
      '/dashboard',
      '/newsfeed',

      '/projects/new',
      '/p/new',
      '/user/edit',
      '/u/edit'
    ]

    var reservedWords = ['edit']

    if (loginOnly.includes(prop.location.pathname)){
      prop.push('/login')
      return
    }
    prop.loadDefaultView()
  }

  componentWillMount(){
    this.handleUser(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.handleUser(nextProps)
  }

  shouldComponentUpdate(nextProp, nextState) {
    return this.props.location.pathname !== nextProp.location.pathname;
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          /* SESSION */
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Registration} />

          /* USER */
          <Route exact path="/u/edit" component={EditProfile} />
          <Route exact path='/u/dashboard' component={Dashboard} />
          <Route exact path="/u/:username/:slug" component={ShowProject} />

          <Route exact path="/user/edit" component={EditProfile} />
          <Route exact path='/user/dashboard' component={Dashboard} />
          <Route exact path="/user/:username/:slug" component={ShowProject} />

          /* PROJECT */
          <Route exact path='/projects' component={ProjectFeed} />
          <Route exact path='/p/new' component={NewProject} />
          <Route exact path='/p/:id' component={ShowProject} />
          <Route exact path='/project/new' component={NewProject} />
          <Route exact path='/project/:id' component={ShowProject} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount,
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
