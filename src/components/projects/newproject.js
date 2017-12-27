import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addProject, loadInProgressProject, clearProject } from '../../actions/projects'

import ProjectInput from './projectinput'
import EditProject from './editproject'

class NewProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1
    }
  }

  componentWillMount(){
    if (window.localStorage.getItem("project_in_progress")) {
      this.setState({
        step: 0
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentProject.id && this.state.step < 2) {
      this.setState({
        step: 2
      })
    }
  }

  render() {
    /* variables */
    let { currentProject, clearProject, loadInProgressProject } = this.props

    /* steps */
    let step = ((step) => {
      switch(step) {
        case 0:
          return (
            <div>
              You have a project in progress - would you like to return to it?
              <button onClick={()=> {
                  let inProgress = window.localStorage.getItem("project_in_progress");
                  if (inProgress){
                    loadInProgressProject(inProgress)
                  } else {
                    this.setState({ step: 1 })
                  } }}>Yes</button>
              <button onClick={()=> { clearProject(); this.setState({ step: 1 }) }}>Start a new project</button>
            </div>
          )
        case 1:
          return (
            <div>
              <h1>Create a new project</h1>
                <ProjectInput
                  addProject={this.props.addProject}
                  />
            </div>
          )
        case 2:
          return (
            <div>
              <EditProject />
            </div>
          )
      }
    })(this.state.step);

    return (
      <div>
        {step}
      </div>);
  }
}


const mapStateToProps = (state) => {
  return ({
    skills: state.manageSkills,
    roles: state.manageRoles,
    interests: state.manageInterests,
    status: state.manageStatus,
    currentProject: state.manageCurrentProject
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, addProject, loadInProgressProject, clearProject,
  }, dispatch)
}

const ConnectedNewProject = connect(mapStateToProps, mapDispatchToProps)(NewProject)

export default ConnectedNewProject
