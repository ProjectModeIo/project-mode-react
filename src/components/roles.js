import React, { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listRoles } from '../actions/roles' // session actions

class Roles extends Component {
  constructor(prop) {
    super(prop)
  }

  componentWillMount() {
    this.props.listRoles();
  }

  render() {
    return (
      <div className="Roles">
        {this.props.roles.map((role, index) => {
          return (
            <div key={index} >
              {role.type}
            </div>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount,
    token: state.manageLogin.token,
    roles: state.manageRoles
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    listRoles
  }, dispatch)
}

const ConnectedRoles = connect(mapStateToProps, mapDispatchToProps)(Roles)

export default ConnectedRoles
