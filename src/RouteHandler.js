import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

// sessions
import Login from './components/sessionsregistration/login'
import Logout from './components/sessionsregistration/logout'
import Registration from './components/sessionsregistration/registration'

// projects
import ProjectIndex from './components/projects/projectindex'
import NewProject from './components/projects/newproject'
import ShowProject from './components/projects/showproject'

// channels
import ShowChannel from './components/channels/showchannel'
import ChannelIndex from './components/channels/channelindex'
import ChannelRoom from './components/channels/channelroom'

// profile
import Dashboard from './components/profile/dashboard'
import EditProfile from './components/profile/editprofile'
import UserProfile from './components/profile/userprofile'

// callbacks
import Github from './components/callbacks/github'

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
    return this.props.loggedIn !== nextProps.loggedIn ||
      this.props.location.pathname !== nextProps.location.pathname
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
          <Route exact path='/u/:username' component={AllAccess(UserProfile)} />

          <Route exact path='/user/edit' component={LoggedIn(EditProfile)} />
          <Route exact path='/user/dashboard' component={LoggedIn(Dashboard)} />
          <Route exact path='/user/:username/:slug' component={AllAccess(ShowProject)} />
          <Route exact path='/user/:username' component={AllAccess(UserProfile)} />

          {/* PROJECT */}
          <Route exact path='/projects' component={AllAccess(ProjectIndex)} />
          <Route exact path='/p/new' component={LoggedIn(NewProject)} />
          <Route exact path='/p/:id' component={AllAccess(ShowProject)} />
          <Route exact path='/project/new' component={LoggedIn(NewProject)} />
          <Route exact path='/project/:id' component={AllAccess(ShowProject)} />

          {/* CHANNELS */}
          <Route exact path='/channels' component={AllAccess(ChannelIndex)} />
          // <Route exact path='/c/room/:id' component={LoggedIn(ChannelRoom)} />
          // <Route exact path='/c/:name/room' component={LoggedIn(ChannelRoom)} />
          <Route exact path='/c/:slug' component={AllAccess(ShowChannel)} />

          <Route exact path='/channel/:slug' component={AllAccess(ShowChannel)} />

          {/* CALLBACKS */}
          <Route exact path="/github" component={LoggedIn(Github)} />
          <Route path='/' component={Home} />
        </Switch>
        {loggedIn ? <div>chat component</div>:null}
      </div>
    );
  }
}
