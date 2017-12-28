import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addProject, clearProject } from '../../actions/projects'
import { addSkill } from '../../actions/skills'
import { addRole } from '../../actions/roles'
import { addInterest } from '../../actions/interests'
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
      this.props.push(`/u/${this.props.currentProject.created_by}/${this.props.currentProject.slug}`)
    }
  }

  render() {
    /* variables */
    let { currentProject, clearProject, titleLine,
      roles, addRole, skills, addSkill, interests, addInterest} = this.props

    /* steps */
    let step = ((step) => {
      switch(step) {
        case 0:
          return (
            <div>
              You have a project in progress - attempt to recover?
              <button onClick={()=> { this.setState({ step: 1 }) }}>
                Yes
              </button>
              <button onClick={()=> {
                  window.localStorage.removeItem("project_in_progress")
                  this.setState({ step: 1 })
                }}>
                Start a new project
              </button>
            </div>
          )
        case 1:
          return (
            <div>
              <h1>{titleLine || "Create a new project"}</h1>
                <ProjectInput
                  roles={roles}
                  skills={skills}
                  interests={interests}
                  addRole={addRole.bind(this)}
                  addSkill={addSkill.bind(this)}
                  addInterest={addInterest.bind(this)}
                  addProject={this.props.addProject}
                  />
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
    push, addProject, clearProject,
    addSkill, addRole, addInterest
  }, dispatch)
}

const ConnectedNewProject = connect(mapStateToProps, mapDispatchToProps)(NewProject)

export default ConnectedNewProject
