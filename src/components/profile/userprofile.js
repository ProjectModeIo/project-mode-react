import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import '../../styles/profile.css'
import { loadCurrentProfile, clearCurrentProfile} from '../../actions/user.js'
import ListProjects from '../projects/listprojects'
import ListDisplay from '../listdisplay'
import GithubInfo from './githubinfo'

class UserProfile extends React.Component {
  componentWillMount() {
    let { username } = this.props.match.params
    if (username) {
      this.props.loadCurrentProfile(username);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { username } = nextProps.match.params

    if (username && this.props.match.params.username !== username) {
      this.props.loadCurrentProfile(username);
    }
  }

  componentWillUnmount() {
    this.props.clearCurrentProfile();
  }

  render() {
    let { id, username, firstname, lastname, github_account_info, created_projects, roles } = this.props.currentProfile
    let ownsAccount = id == this.props.account.id

    return (
      <div className="profile-page">
        <div className="sidebar">
          <h1>{username}</h1>
          <p>{ownsAccount ? <Link to="/user/edit">Edit Profile</Link>: null}</p>
          <p>{firstname} {lastname}</p>
          {github_account_info ? <GithubInfo githubInfo={github_account_info}/>:<p>doesn't have github</p>}
          <ListDisplay
            list={roles}
            customProps={{ listClass: 'inline-list__wrap', itemClass: 'inline-list__item' }}
            catName = "name"
            />
        </div>
        <div className="main-content">
          <h1>Projects</h1>
          <ListProjects list={created_projects} catName="title" username={username}/>
        </div>
      </div>);
  }
}


const mapStateToProps = (state) => {
  return ({
    // token: state.manageLogin.token,
    // skills: state.manageSkills,
    // roles: state.manageRoles,
    // interests: state.manageInterests,
    account: state.manageAccount,
    // status: state.manageStatus
    currentProfile: state.manageCurrentProfile
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, loadCurrentProfile, clearCurrentProfile
  }, dispatch)
}

const ConnectedUserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfile)

export default ConnectedUserProfile
