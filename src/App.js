import React, { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';
import {Route, Switch, Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import Roles from './components/roles'
import Dashboard from './components/profile/dashboard'
import Login from './components/sessionsregistration/login'
import Registration from './components/sessionsregistration/registration'
import { clearUser, logout, setUser } from './actions/sessionsregistration' // session actions

const Home = () => {
  return (
    <div>
      <Roles />
    </div>
  )
}

class App extends Component {
  constructor(prop) {
    super(prop)
  }

  handleUser(prop){
    if (prop.token) {
      // debugger;
      // logged in
      if (prop.location.pathname == '/logout') {
        prop.clearUser()
        prop.logout()
        prop.push('/login')
      } else if (prop.location.pathname == '/login') {
        prop.push('/')
      } else {
        if (!prop.account || !prop.account.id) {
          prop.setUser(prop.token)
        }
      }
    } else {
      // not logged in
      var loginOnly = ['/account/projects', '/dashboard', '/newsfeed', '/projects/new']
      if (loginOnly.includes(prop.location.pathname)){
        prop.push('/login')
      }
    }
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
        <div>
          {this.props.token ?
            <Link to={'/dashboard'}>dashboard</Link> :
            <div>
              <Link to={'/login'}>login</Link>
              <Link to={'/registration'}>registration</Link>
            </div>}
          <Link to={'/'}>home</Link>
          <Link to={'/logout'}>logout</Link>
        </div>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Registration} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount,
    token: state.manageLogin.token
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push,
    clearUser, logout, setUser // session actions
  }, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
