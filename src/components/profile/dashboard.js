import React, { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
// import { push } from 'react-router-redux'
import { addGithubAccount } from '../../actions/callbacks'

import ListDisplay from '../listdisplay'
import ListProjects from '../projects/listprojects'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.githubUpdated = this.githubUpdated.bind(this)
  }

  componentWillMount() {
    window.addEventListener("message", this.githubUpdated)
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.githubUpdated)
  }

  githubUpdated(msg) {
    if (msg.data.access_token_from_oauth) {
      this.props.addGithubAccount(msg.data);
      msg.source.postMessage("close","*")
    }
  }

  render() {
    let { username,
      email, firstname, lastname, tagline,
      interests, roles, skills,
      created_projects, github_access_token } = this.props.account
    let githubUrl = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;

    return (
      <div className="Dashboard">
        <h1>Hi, {firstname}</h1>
        <p>{tagline}</p>
        {github_access_token ? "Github Connected!":<button onClick={()=>{
            window.open(githubUrl, "Github Oauth", "width=500px,height=500px")
          }}>test</button>}
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
    addGithubAccount
  }, dispatch)
}

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default ConnectedDashboard
