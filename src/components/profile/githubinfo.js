import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import '../../styles/profile.css'
import { loadCurrentProfile, clearCurrentProfile} from '../../actions/user.js'
import ListDisplay from '../listdisplay'

class GithubInfo extends Component {

  render() {
    let { html_url, login, avatar_url } = this.props.githubInfo
    return (
      <div className="account-github">
        <h4>Github Info</h4>
        <img src={avatar_url} className="github_avatar"/>
        <h3><Link to={html_url} target="_blank">{login}</Link></h3>
      </div>);
  }
}

export default GithubInfo
