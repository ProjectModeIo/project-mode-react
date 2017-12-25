import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { register } from '../../actions/sessionsregistration'
import { listSkills } from '../../actions/skills'
import { listRoles } from '../../actions/roles'
import { listInterests } from '../../actions/interests'
import { addProject } from '../../actions/projects'
import ProjectInput from './projectinput'

import AddToListRelation from '../addtolistrelation'

class NewProject extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.listSkills();
    this.props.listRoles();
    this.props.listInterests();
  }

  componentDidUpdate(prevProps, prevState) {
  }

  nextStep(step) {
    debugger;
  }

  render() {

    return (
      <div>
        <h1>Create a new project</h1>
          <ProjectInput
            addProject={this.props.addProject}
            nextStep={this.nextStep.bind(this, 2)}
            />
        {this.props.status.error ? <div>{this.props.status.error}</div>: null}
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
    push, listSkills, listRoles, listInterests, addProject
  }, dispatch)
}

const ConnectedNewProject = connect(mapStateToProps, mapDispatchToProps)(NewProject)

export default ConnectedNewProject
