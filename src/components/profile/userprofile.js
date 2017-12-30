import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import '../../styles/profile.css'
import { loadCurrentProfile, clearCurrentProfile} from '../../actions/user.js'
import ListDisplay from '../listdisplay'

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
    let { username, firstname, lastname, github_account_info } = this.props.currentProfile
    return (
      <div>
        <h1>{username}</h1>
        <p>{firstname} {lastname}</p>
        {github_account_info ? <p>has github</p>:<p>doesn't have github</p>}
      </div>);
  }
}


const mapStateToProps = (state) => {
  return ({
    // token: state.manageLogin.token,
    // skills: state.manageSkills,
    // roles: state.manageRoles,
    // interests: state.manageInterests,
    // account: state.manageAccount,
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
