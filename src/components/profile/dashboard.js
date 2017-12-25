import React, { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    let {email, firstname, lastname, tagline} = this.props.account

    return (
      <div className="Dashboard">
        <h1>Hi, {firstname}</h1>
        <p>{tagline}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default ConnectedDashboard
