import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import '../../styles/profile.css'
import { loadCurrentProfile, clearCurrentProfile} from '../../actions/user.js'
import ListDisplay from '../listdisplay'
import javascript_time_ago from 'javascript-time-ago'
javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')

class GithubInfo extends Component {

  render() {
    let { html_url, login, avatar_url } = this.props.githubInfo
    let time_ago_english = new javascript_time_ago('en-US')
    let updated_at = time_ago_english.format(new Date(this.props.githubInfo.updated_at))

    return (
      <div className="account-github">
        <h4>Github Info</h4>
        <img src={avatar_url} className="github_avatar"/>
        <h3><Link to={html_url} target="_blank">{login}</Link></h3>
        <p>last updated {updated_at}</p>
      </div>);
  }
}

export default GithubInfo
