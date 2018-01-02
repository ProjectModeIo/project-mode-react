import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../styles/projects.css';
import RenderProjectList from './renderprojectlist'

class ProjectFeed extends Component {

  loggedInProjectFeed() {
    let {feed, account} = this.props

    return (
      <div>
        <RenderProjectList title="Recommended for you" list={feed.projects_recommended} account={account} />
        <RenderProjectList title="Related to your interests" list={feed.projects_interest_related} account={account} />
        <RenderProjectList title="Related to your role" list={feed.projects_role_related} account={account} />
        <RenderProjectList title="Related to your skills" list={feed.projects_skill_related} account={account} />
        <RenderProjectList title="All projects" list={feed.projects_all} account={account} />
      </div>
    )
  }

  notLoggedInProjectFeed() {
    let {feed, account} = this.props
    return (
      <div>
        <RenderProjectList title="All projects" list={feed.projects_all} account={account} />
      </div>
    )
  }

  render() {
    if (this.props.account.id) {
      // signed in
      return this.loggedInProjectFeed()
    } else {
      // not signed in
      return this.notLoggedInProjectFeed();
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount,
    feed: state.manageFeed
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

const ConnectedProjectFeed = connect(mapStateToProps, mapDispatchToProps)(ProjectFeed)

export default ConnectedProjectFeed
