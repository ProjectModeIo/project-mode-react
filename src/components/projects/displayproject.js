import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { nameToSlug } from '../../utilities'
import Comments from './comments'
import WatchProject from './watchproject'
import Volunteer from './volunteer'

class DisplayProject extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    /* variables */
    let {currentProject} = this.props
    return (
      <div className="index-page">
        <div className="sidebar">
          <h1>Project Details</h1>
          <p>Created by {currentProject.created_by}</p>
          <WatchProject />
          <Volunteer />
          <p>
            tags: {currentProject.interests.map(interest => {
              return (
                <span className="project-list_meta-data-item">
                  <Link to={`/c/${nameToSlug(interest.name)}`}>
                    {interest.name}
                  </Link>
                </span>
              )
            })}
          </p>
          <p>
            stack: {currentProject.skills.map(skill => {
              return (
                <span className="project-list_meta-data-item">
                  <Link to={`/c/${nameToSlug(skill.name)}`}>
                    {skill.name}
                  </Link>
                </span>
              )
            })}
          </p>
          <p>
            help needed: {currentProject.roles.map(role => {
              return (
                <span className="project-list_meta-data-item">
                  <Link to={`/c/${nameToSlug(role.name)}`}>
                    {role.name}
                  </Link>
                </span>
              )
            })}
          </p>
        </div>
        <div className="main-content">
          <h1>{currentProject.title}</h1>
          <p>{currentProject.description}</p>
          <Comments />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    status: state.manageStatus,
    currentProject: state.manageCurrentProject
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

const ConnectedDisplayProject = connect(mapStateToProps, mapDispatchToProps)(DisplayProject)

export default ConnectedDisplayProject
