import React, { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
// import { push } from 'react-router-redux'

import ListDisplay from '../listdisplay'
import ListProjects from '../projects/listprojects'

class Dashboard extends Component {

  render() {
    let { username,
      email, firstname, lastname, tagline,
      interests, roles, skills,
      created_projects } = this.props.account

    return (
      <div className="Dashboard">
        <h1>Hi, {firstname}</h1>
        <p>{tagline}</p>
        <div>
          You are a
          <ListDisplay
            list={roles}
            catName = "name"
            customProps={{ listClass: 'inline-list__wrap', itemClass: 'inline-list__item' }} />
        </div>
          <div>You have experience with
            <ListDisplay
              list={skills}
              catName="name"
              customProps={{ listClass: 'inline-list__wrap', itemClass: 'inline-list__item' }} />
          </div>
          <div>
            You enjoy
            <ListDisplay
              list={interests}
              catName="name"
              customProps={{ listClass: 'inline-list__wrap', itemClass: 'inline-list__item' }} />
          </div>
        <p><Link to={'/user/edit'}>Edit profile</Link></p>
      <Link to={'/project/new'}>Create a new project?</Link>
      <h2>Manage your projects</h2>
      <ListProjects list={created_projects} catName="title" username={username}/>
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
    // push
  }, dispatch)
}

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default ConnectedDashboard
