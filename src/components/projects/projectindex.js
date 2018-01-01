import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/projects.css'
import ProjectFeed from './projectfeed'

class ProjectIndex extends Component {

  render() {
    return (
      <div className="index-page">
        <div className="main-content">
          <h2>Browse</h2>
          <ProjectFeed />
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
    account: state.manageAccount
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

const ConnectedProjectIndex = connect(mapStateToProps, mapDispatchToProps)(ProjectIndex)

export default ConnectedProjectIndex
