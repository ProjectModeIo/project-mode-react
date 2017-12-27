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
import EditProject from './components/projects/editproject'
import ShowProject from './components/projects/showproject'

class RouteHandler extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    let { user } = this.props

    return (
      <div className="RouteHandler">
        <Nav />
        <Switch>
          /* SESSION */
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Registration} />

          /* USER */
          <Route exact path="/u/edit" component={EditProfile} />
          <Route exact path='/u/dashboard' component={Dashboard} />
          <Route exact path="/u/:username/:slug/edit" component={EditProject} />
          <Route exact path="/u/:username/:slug" component={ShowProject} />

          <Route exact path="/user/edit" component={EditProfile} />
          <Route exact path='/user/dashboard' component={Dashboard} />
          <Route exact path="/user/:username/:slug/edit" component={EditProject} />
          <Route exact path="/user/:username/:slug" component={ShowProject} />

          /* PROJECT */
          <Route exact path='/projects' component={ProjectFeed} />
          <Route exact path='/p/new' component={NewProject} />
          <Route exact path='/p/:id/edit' component={EditProject} />
          <Route exact path='/p/:id' component={ShowProject} />
          <Route exact path='/project/new' component={NewProject} />
          <Route exact path='/project/:id/edit' component={EditProject} />
          <Route exact path='/project/:id' component={ShowProject} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}
