import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { push } from 'react-router-redux'

/* actions */
import { listSkills, addSkill, addProjectskill, deleteProjectskill } from '../../actions/skills'
import { listRoles, addRole, addProjectrole, deleteProjectrole } from '../../actions/roles'
import { listInterests, addInterest, addProjectinterest, deleteProjectinterest } from '../../actions/interests'
import { addProject, loadInProgressProject, loadProject, loadProjectBySlug, clearProject } from '../../actions/projects'

import AddToListRelation from '../addtolistrelation'

class EditProject extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.listSkills();
    this.props.listRoles();
    this.props.listInterests();
  }

  // componentWillMount() {
  //   let { slug, id } = this.props.match.params
  //   if (id) {
  //     this.props.loadProject(id);
  //   } else if (slug) {
  //     this.props.loadProjectBySlug(slug);
  //   }
  // }

  componentWillUpdate(nextProps) {
    // can only see this if you're logged in as per app, so wait for user account to load too

  }

  // componentWillReceiveProps(nextProps) {
  //   let { slug, id } = nextProps.match.params
  //   if (slug) {
  //     if (this.props.match.params.slug !== slug) {
  //       this.props.loadProjectBySlug(slug)
  //     }
  //   } else if (id) {
  //     if (this.props.match.params.id !== id) {
  //       this.props.loadProject(id);
  //     }
  //   }
  // }

  // componentWillUnmount() {
  //   this.props.clearProject();
  // }

  render() {
    /* variables */
    let { currentProject, clearProject, loadInProgressProject,
      roles, addRole, listRoles, addProjectrole, deleteProjectrole,
      skills, addSkill, listSkills, addProjectskill, deleteProjectskill,
      interests, addInterest, listInterests, addProjectinterest, deleteProjectinterest
    } = this.props

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
          showList = {true}
          title = "What roles do you need?"
          allowMultiple = {true}
          />
        <AddToListRelation
          pool = {{ list: interests, action: addInterest.bind(this) }}
          relation = {{
            list: currentProject.interests,
            action: addProjectinterest.bind(this, currentProject.id),
            delete: deleteProjectinterest.bind(this) }}
          catName = "name"
          showList = {true}
          title = "Project audience/category?"
          />
        <AddToListRelation
          pool = {{ list: skills, action: addSkill.bind(this) }}
          relation = {{
            list: currentProject.skills,
            action: addProjectskill.bind(this, currentProject.id),
            delete: deleteProjectskill.bind(this) }}
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
    push, addProject, loadInProgressProject, clearProject,
    loadProject, loadProjectBySlug,
    listSkills, addSkill, addProjectskill, deleteProjectskill,
    listRoles, addRole, addProjectrole, deleteProjectrole,
    listInterests, addInterest, addProjectinterest, deleteProjectinterest
  }, dispatch)
}

const ConnectedEditProject = connect(mapStateToProps, mapDispatchToProps)(EditProject)

export default ConnectedEditProject
