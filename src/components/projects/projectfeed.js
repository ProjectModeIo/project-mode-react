import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../styles/projects.css';
import ListProjects from './listprojects'

class ProjectFeed extends Component {
  loggedInProjectFeed() {
    return (
      <div>
        <h3>Recommended for you:</h3>
        <ListProjects
          list={this.props.feed.projects_recommended}
          account={this.props.account}
          />
        <h3>You may be interested in: </h3>
        <ListProjects
          list={this.props.feed.projects_interest_related}
          account={this.props.account}
          />
        <h3>These projects need a ____ </h3>
        <ListProjects
          list={this.props.feed.projects_role_related}
          account={this.props.account}
          />
        <h3>These projects could use your skills</h3>
        <ListProjects
          list={this.props.feed.projects_skill_related}
          account={this.props.account}
          />
      </div>
    )
  }

  notLoggedInProjectFeed() {
    return (
      <div>
        <ListProjects list={this.props.feed.projects_all} />
      </div>
    )
  }

  render() {
    return (
      <div className="index-page">
        <div className="main-content">
          <h2>Browse</h2>
          (add filter/sorting)
          {this.props.account.id ? this.loggedInProjectFeed() : this.notLoggedInProjectFeed()}
        </div>
        <div className="sidebar">
          sidebar component - if logged in, maybe a feed or messages - closable/minify
          maybe move to the App level
        </div>
      </div>
    )
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
