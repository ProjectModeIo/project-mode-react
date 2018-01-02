import React, {Component} from 'react';
import AddToListRelation from '../addtolistrelation'
import { projectScopeDefaults } from '../../variables/projectdefaults'
import { stringifyJsonFields, safeParseJson } from '../../utilities'

export default class ProjectInput extends Component {
  constructor(props) {
    super(props);

    let inProgress = window.localStorage.getItem("project_in_progress");
    let savedState = inProgress ? JSON.parse(inProgress) : {};

    this.state={
      title: savedState.title || '',
      description: savedState.description || '',
      project_scope: savedState.project_scope || 'passion project',
      roles: savedState.roles || [],
      skills: savedState.skills || [],
      interests: savedState.interests || [],
    }
  }

  handleSubmit(){
    if (this.validateFields()) {
      this.cleanedProgress = this.preparedFields(this.state)
      this.saveProgress()
      this.props.addProject(this.cleanedProgress)
    } else {
      // error status
    }
  }

  preparedFields(fields) {
    return {...fields,
      roles: fields.roles.map(item => {return { name: item.name }}),
      skills: fields.skills.map(item => {return { name: item.name }}),
      interests: fields.interests.map(item => {return { name: item.name }})
    }
  }

  validateFields() {
    let { title, description } = this.state;

    if (!title || !description) {
      return false;
    }
    return true;
  }

  addProjectList(field, params) {
    let prevList = this.state[field]
    let lastId = prevList.length > 0 ? prevList[prevList.length - 1] : 0
    let newItem = {...params, id: lastId}

    this.setState({
      [field]: [...prevList, newItem]
    }, this.saveProgress)
  }

  deleteProjectList(field, id) {
    let newList = this.state[field].filter(item => item.id !== id)

    this.setState({
      [field]: newList
    }, this.saveProgress)
  }

  saveProgress() {
    console.log('saved');
    let lastProgress = this.cleanedProgress || this.state
    window.localStorage.setItem("project_in_progress", JSON.stringify(lastProgress))
  }

  handleChange(field, event){
    this.setState({
      [field]: event.target.value
    })
  }

  render() {
    let { roles, addRole, skills, addSkill, interests, addInterest } = this.props

    return (
      <div className="project-input">
        <div className="project-input_row">
          <input type="title"
            className="project-input_inputs"
            onBlur={this.saveProgress.bind(this)}
            placeholder="My New Project!"
            value={this.state.title}
            onChange={this.handleChange.bind(this, "title")} />
        </div>
        <div className="project-input_row">
          <textarea
            className="project-input_inputs"
            type="description"
            onBlur={this.saveProgress.bind(this)}
            placeholder="A cool description"
            value={this.state.description}
            onChange={this.handleChange.bind(this, "description")} />
        </div>
        <div className="project-input_row">
          <label className="project-input_label">This is a: </label>
          <select
            className="project-input_select"
            onChange={(event)=>{
              this.setState({
                project_scope: event.target.value
              }, ()=> {
                this.saveProgress()
              })
            }}
            value={this.state.project_scope}>
            {projectScopeDefaults.map(item => {
              return (<option>{item}</option>)
            })}
          </select>
        </div>
        <div className="project-input_row">
          <AddToListRelation
            pool = {{ list: roles, action: addRole.bind(this) }}
            relation = {{
              list: this.state.roles,
              action: this.addProjectList.bind(this, 'roles'),
              delete: this.deleteProjectList.bind(this, 'roles') }}
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
            title = "What roles are you looking for"
            allowMultiple = {true} />
        </div>
        <div className="project-input_row">
          <AddToListRelation
            pool = {{ list: skills, action: addSkill.bind(this) }}
            relation = {{
              list: this.state.skills,
              action: this.addProjectList.bind(this, 'skills'),
              delete: this.deleteProjectList.bind(this, 'skills') }}
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
            title = "Project Stack" />
        </div>
        <div className="project-input_row">
          <AddToListRelation
            pool = {{ list: interests, action: addInterest.bind(this) }}
            relation = {{
              list: this.state.interests,
              action: this.addProjectList.bind(this, 'interests'),
              delete: this.deleteProjectList.bind(this, 'interests') }}
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
            title = "Add Tags" />
        </div>
        <div className="project-input_row">
          <button onClick={this.handleSubmit.bind(this)} className="next-button next-button_home theme1_1" type="submit">Next</button>
        </div>
      </div>);
  }
}
