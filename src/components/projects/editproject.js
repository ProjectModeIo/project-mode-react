import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

/* actions */
import { addSkill, addProjectskill, deleteProjectskill } from '../../actions/skills'
import { addRole, addProjectrole, deleteProjectrole } from '../../actions/roles'
import { addInterest, addProjectinterest, deleteProjectinterest } from '../../actions/interests'
import { addProject, loadProject, loadProjectBySlug, github } from '../../actions/projects'

import AddToListRelation from '../addtolistrelation'

class EditProject extends Component {

  render() {
    /* variables */
    let { currentProject,
      roles, addRole, addProjectrole, deleteProjectrole,
      skills, addSkill, addProjectskill, deleteProjectskill,
      interests, addInterest, addProjectinterest, deleteProjectinterest
    } = this.props

    return (
      <div>
        <button onClick={this.props.github}>click meee</button>
        <h1>{currentProject.title}</h1>
        <p>{currentProject.description}</p>
        <AddToListRelation
          pool = {{ list: roles, action: addRole.bind(this) }}
          relation = {{
            list: currentProject.roles,
            action: addProjectrole.bind(this, currentProject.id),
            delete: deleteProjectrole.bind(this)
          }}
          customProps={{
            outerWrapClass: "project-input_list-wrap",
            rowClass: "project-input_row",
            titleClass: "project-input_label",
            inputClass: "project-input_select",
            addButtonClass: "next-button theme1_1",
            listWrapClass: "project-input_list-display"
          }}
          catName = "name"
          showList = {true}
          title = "What roles do you need?"
          allowMultiple = {true}
          />
        <AddToListRelation
          pool = {{ list: interests, action: addInterest.bind(this) }}
          relation = {{
            list: currentProject.interests,
            action: addProjectinterest.bind(this, currentProject.id),
            delete: deleteProjectinterest.bind(this)
          }}
          customProps={{
            outerWrapClass: "project-input_list-wrap",
            rowClass: "project-input_row",
            titleClass: "project-input_label",
            inputClass: "project-input_select",
            addButtonClass: "next-button theme1_1",
            listWrapClass: "project-input_list-display"
          }}
          catName = "name"
          showList = {true}
          title = "Project audience/category?"
          />
        <AddToListRelation
          pool = {{ list: skills, action: addSkill.bind(this) }}
          relation = {{
            list: currentProject.skills,
            action: addProjectskill.bind(this, currentProject.id),
            delete: deleteProjectskill.bind(this)
          }}
          customProps={{
            outerWrapClass: "project-input_list-wrap",
            rowClass: "project-input_row",
            titleClass: "project-input_label",
            inputClass: "project-input_select",
            addButtonClass: "next-button theme1_1",
            listWrapClass: "project-input_list-display"
          }}
          catName = "name"
          showList = {true}
          title = "What skills do you need?"
          />
      </div>);
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount,
    skills: state.manageSkills,
    roles: state.manageRoles,
    interests: state.manageInterests,
    status: state.manageStatus,
    currentProject: state.manageCurrentProject
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, addProject, github,
    loadProject, loadProjectBySlug,
    addSkill, addProjectskill, deleteProjectskill,
    addRole, addProjectrole, deleteProjectrole,
    addInterest, addProjectinterest, deleteProjectinterest
  }, dispatch)
}

const ConnectedEditProject = connect(mapStateToProps, mapDispatchToProps)(EditProject)

export default ConnectedEditProject
