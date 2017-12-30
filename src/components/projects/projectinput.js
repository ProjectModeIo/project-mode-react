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

  addProjectRole(field, params) {
    let prevList = this.state[field]
    let lastId = prevList.length > 0 ? prevList[prevList.length - 1] : 0
    let newItem = {...params, id: lastId}

    this.setState({
      [field]: [...prevList, newItem]
    }, this.saveProgress)
  }

  deleteProjectRole(field, id) {
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
        <input type="title"
          className="project-input_inputs"
          onBlur={this.saveProgress.bind(this)}
          placeholder="My New Project!"
          value={this.state.title}
          onChange={this.handleChange.bind(this, "title")} /><br />
        <textarea
          className="project-input_inputs"
          type="description"
          onBlur={this.saveProgress.bind(this)}
          placeholder="A cool description"
          value={this.state.description}
          onChange={this.handleChange.bind(this, "description")} /><br />
        <select
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
        <AddToListRelation
          pool = {{ list: roles, action: addRole.bind(this) }}
          relation = {{
            list: this.state.roles,
            action: this.addProjectRole.bind(this, 'roles'),
            delete: this.deleteProjectRole.bind(this, 'roles') }}
          catName = "name"
          showList = {true}
          title = "What roles do you need?"
          allowMultiple = {true} />
        <button onClick={this.handleSubmit.bind(this)} className="next-button" type="submit">Next</button>
      </div>);
  }
}
