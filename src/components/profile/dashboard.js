import React, { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
// import { push } from 'react-router-redux'

class Dashboard extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    let { username,
      email, firstname, lastname, tagline,
      interests, roles, skills,
      created_projects } = this.props.account

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
      <h2>Your projects</h2>
      <ListProjects list={created_projects} catName="title" username={username}/>
      </div>
    );
  }
}

const ListProjects = (props) => {
  return (
    <div>
      {props.list.map((project, index) => {
        return (
          <ListProjectLine
            key={index}
            username={props.username}
            project={project}
            />
        )
      })}
    </div>
  )
}

const ListProjectLine = (props) => {
  return (
    <div>
      <Link to={`/u/${props.username}/${props.project.slug}`} >{props.project.title}</Link>
      <p>{props.project.description}</p>
    </div>
  )
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
    // push
  }, dispatch)
}

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default ConnectedDashboard
