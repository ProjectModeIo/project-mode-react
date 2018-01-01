import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/nav.css';
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

class Nav extends Component {

  render() {
    let loggedIn = !!this.props.account.id;
    let loggedInLinks = [
      <Link className="navbar_link" to={'/user/dashboard'}>dashboard</Link>,
      <Link className="navbar_link" to={'/logout'}>logout</Link>
    ];

    let loggedOutLinks = [
      <Link className="navbar_link" to={'/login'}>login</Link>,
      <Link className="navbar_link" to={'/registration'}>register</Link>
    ]

    return (
      <div className="Nav theme1_1">
        <Link className="navbar_link" to={'/'}>PM[logo]</Link>
        <Link className="navbar_link" to="/projects">Projects</Link>
        <Link className="navbar_link" to="/channels">Channels</Link>
        <div className="end">
          {loggedIn ? loggedInLinks.map(link => link) : loggedOutLinks.map(link => link)}
        </div>
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
