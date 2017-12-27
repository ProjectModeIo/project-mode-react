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
import Logout from './components/sessionsregistration/logout'
import Registration from './components/sessionsregistration/registration'
import NewProject from './components/projects/newproject'
import ShowProject from './components/projects/showproject'

const Authorization = (allowed, status) => (WrappedComponent) => {
  return class WithAuthorization extends Component {
    constructor(props) {
      super(props)
    }
    render() {
      if (allowed.includes(status)) {
        return <WrappedComponent {...this.props} />
      } else {
        return <h1>You must be logged in to do that</h1>
      }
    }
  }
}

export default class RouteHandler extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    let { loggedIn, loaded } = this.props
    let LoggedIn = Authorization([true], loggedIn)
    let AllAccess = Authorization([true, false], loggedIn)
    let LoggedOut = Authorization([false], loggedIn)

    return (
      <div className="RouteHandler">
        <Switch>
          /* SESSION */
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Registration} />
          <Route exact path='/logout' component={Logout} />

          /* USER */
          <Route exact path="/u/edit" component={LoggedIn(EditProfile)} />
          <Route exact path='/u/dashboard' component={LoggedIn(Dashboard)} />
          <Route exact path="/u/:username/:slug" component={AllAccess(ShowProject)} />

          <Route exact path="/user/edit" component={LoggedIn(EditProfile)} />
          <Route exact path='/user/dashboard' component={LoggedIn(Dashboard)} />
          <Route exact path="/user/:username/:slug" component={AllAccess(ShowProject)} />

          /* PROJECT */
          <Route exact path='/projects' component={AllAccess(ProjectFeed)} />
          <Route exact path='/p/new' component={LoggedIn(NewProject)} />
          <Route exact path='/p/:id' component={AllAccess(ShowProject)} />
          <Route exact path='/project/new' component={LoggedIn(NewProject)} />
          <Route exact path='/project/:id' component={AllAccess(ShowProject)} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}
