import React, { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { titleize } from '../../utilities'
import '../../styles/profile.css'
// import { push } from 'react-router-redux'
import { addGithubAccount } from '../../actions/callbacks'
import GithubInfo from './githubinfo'
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

  renderGithubInfo() {
    let {github_account_info} = this.props.account
    if (github_account_info) {
      return <GithubInfo githubInfo={github_account_info}/>
    }
  }

  renderGithubLink() {
    let githubUrl = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
    let { github_access_token, github_account_info } = this.props.account

    if (!github_access_token) {
      return (
        <button className="profile-button"
          onClick={() => { window.open(githubUrl, "Github Oauth", "width=500px,height=500px")}} >
          {github_account_info ? "Refresh":"Link"} Github
        </button>
      )
    }
  }

  render() {
    let { username,
      email, firstname, lastname, tagline,
      interests, roles, skills,
      created_projects } = this.props.account

    return (
      <div className="profile-page">
        <div className="sidebar">
          <h2>Hi, {titleize(username)}</h2>
          <p>{tagline}</p>
          {this.renderGithubInfo()}
          {this.renderGithubLink()}
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
        </div>
        <div className="main-content">
          <h2>Manage your projects</h2>
          <ListProjects list={created_projects} catName="title" username={username}/>
          <Link to={'/project/new'}>Create a new project?</Link>
        </div>
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
