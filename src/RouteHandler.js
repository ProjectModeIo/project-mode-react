import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
// sessions
import Login from './components/sessionsregistration/login'
import Logout from './components/sessionsregistration/logout'
import Registration from './components/sessionsregistration/registration'

// projects
import ProjectFeed from './components/projects/projectfeed'
import NewProject from './components/projects/newproject'
import ShowProject from './components/projects/showproject'

// channels
import ShowChannel from './components/channels/showchannel'
import ChannelIndex from './components/channels/channelindex'

// profile
import Dashboard from './components/profile/dashboard'
import EditProfile from './components/profile/editprofile'

import Home from './components/home'

const Authorization = (allowed, status) => (WrappedComponent) => {
  return class WithAuthorization extends Component {
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

  shouldComponentUpdate(nextProps) {
    return this.props.loggedIn !== nextProps.loggedIn || this.props.location.pathname !== nextProps.location.pathname
  }

  render() {
    let { loggedIn, loaded } = this.props
    let LoggedIn = Authorization([true], loggedIn)
    let AllAccess = Authorization([true, false], loggedIn)
    let LoggedOut = Authorization([false], loggedIn)

    return (
      <div className='RouteHandler'>
        <Switch>
          {/* SESSION */}
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Registration} />
          <Route exact path='/logout' component={Logout} />

          {/* USER */}
          <Route exact path='/u/edit' component={LoggedIn(EditProfile)} />
          <Route exact path='/u/dashboard' component={LoggedIn(Dashboard)} />
          <Route exact path='/u/:username/:slug' component={AllAccess(ShowProject)} />

          <Route exact path='/user/edit' component={LoggedIn(EditProfile)} />
          <Route exact path='/user/dashboard' component={LoggedIn(Dashboard)} />
          <Route exact path='/user/:username/:slug' component={AllAccess(ShowProject)} />

          {/* PROJECT */}
          <Route exact path='/projects' component={AllAccess(ProjectFeed)} />
          <Route exact path='/p/new' component={LoggedIn(NewProject)} />
          <Route exact path='/p/:id' component={AllAccess(ShowProject)} />
          <Route exact path='/project/new' component={LoggedIn(NewProject)} />
          <Route exact path='/project/:id' component={AllAccess(ShowProject)} />

          {/* CHANNELS */}
          <Route exact path='/channels' component={AllAccess(ChannelIndex)} />
          <Route exact path='/c/:name' component={AllAccess(ShowChannel)} />

          <Route exact path='/channel/:name' component={AllAccess(ShowChannel)} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}
