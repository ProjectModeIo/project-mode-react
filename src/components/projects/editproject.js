import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { push } from 'react-router-redux'

/* actions */
import { listSkills } from '../../actions/skills'
import { listRoles, addRole, addProjectrole, deleteProjectrole } from '../../actions/roles'
import { listInterests } from '../../actions/interests'
import { addProject, loadInProgressProject, clearProject } from '../../actions/projects'

import AddToListRelation from '../addtolistrelation'

class EditProject extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.listSkills();
    this.props.listRoles();
    this.props.listInterests();
  }

  render() {
    /* variables */
    let { currentProject, clearProject, loadInProgressProject,
      roles, addRole, listRoles, addProjectrole, deleteProjectrole} = this.props

    return (
      <div>
        <h1>{currentProject.title}</h1>
        <p>{currentProject.description}</p>
        <AddToListRelation
          pool = {{ list: roles, action: addRole.bind(this) }}
          relation = {{
            list: currentProject.roles,
            action: addProjectrole.bind(this, currentProject.id),
            delete: deleteProjectrole.bind(this) }}
          catName = "type"
          title = "What roles do you need?"
          allowMultiple = {true}
          />
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
    listSkills,
    listRoles, addRole, addProjectrole, deleteProjectrole,
    listInterests
  }, dispatch)
}

const ConnectedEditProject = connect(mapStateToProps, mapDispatchToProps)(EditProject)

export default ConnectedEditProject
