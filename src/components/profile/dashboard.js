import React, { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    let {email, firstname, lastname, tagline, interests, roles, skills} = this.props.account

    return (
      <div className="Dashboard">
        <h1>Hi, {firstname}</h1>
        <p>{tagline}</p>
        <p>
          You are a <ListDisplay list={roles} catName="type" />,
          experienced with in <ListDisplay list={skills} catName="name" />,
          who enjoys <ListDisplay list={interests} catName="name" />
        </p>
      <Link to={'/newproject'}>Create a new project?</Link>
      </div>
    );
  }
}

const ListDisplay = (props) => {
  return (
    <span>
      {props.list.map((item, index) => {
        return (
          <ListDisplayItem
            key={index}
            item={item}
            catName={props.catName}
            />
        )
      })}
    </span>
  )
}

const ListDisplayItem = (props) => {
  return (
    <span>
      {props.item[props.catName]}
    </span>
  )
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
