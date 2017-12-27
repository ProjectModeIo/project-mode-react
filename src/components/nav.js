import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/nav.css';
import { Route, Switch, Link} from 'react-router-dom'
import { push } from 'react-router-redux'

class Nav extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    let loggedIn = !!this.props.account.id;
    let loggedInLinks = [
      <Link className="navbar_link" to={'/user/dashboard'}>dashboard</Link>,
      <Link className="navbar_link" to={'/logout'}>logout</Link>
    ];

    let loggedOutLinks = [
      <Link className="navbar_link" to={'/login'}>login</Link>,
      <Link className="navbar_link" to={'/registration'}>registration</Link>
    ]

    return (
      <div className="Nav">
        <Link className="navbar_link" to={'/'}>PM[logo]</Link>
        <Link className="navbar_link" to="/projects">Projects</Link>
        {loggedIn ? loggedInLinks.map(link => link) : loggedOutLinks.map(link => link)}
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
    push
  }, dispatch)
}

const ConnectedNav = connect(mapStateToProps, mapDispatchToProps)(Nav)

export default ConnectedNav
