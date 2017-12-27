import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Comments from './comments'

class DisplayProject extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    /* variables */
    let {currentProject} = this.props
    return (
      <div>
        <h1>{currentProject.title}</h1>
        <p>{currentProject.description}</p>

        <Comments />
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
