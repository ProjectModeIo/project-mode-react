import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { clearUser, logout, loadDefaultView } from '../../actions/sessionsregistration'

class Logout extends Component {

  componentDidMount(){
    this.props.clearUser();
    this.props.logout();
    this.props.loadDefaultView();
    this.props.push('/')
  }

  render() {
    return (
      <h1 className="loading-text">
        Logging out...
      </h1>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ push, clearUser, logout, loadDefaultView }, dispatch)
}

const ConnectedLogout = connect(mapStateToProps, mapDispatchToProps)(Logout)

export default ConnectedLogout
