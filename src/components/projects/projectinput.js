import React, {Component} from 'react';
import AddToListRelation from '../addtolistrelation'

export default class ProjectInput extends Component {
  constructor(props) {
    super(props);

    let inProgress = window.localStorage.getItem("project_in_progress");
    this.state={
      title: inProgress ? JSON.parse(inProgress).title : '',
      description: inProgress ? JSON.parse(inProgress).description : '',
      roles: inProgress ? JSON.parse(inProgress).roles || [] : [],
      skills: inProgress ? JSON.parse(inProgress).skills || [] : [],
      interests: inProgress ? JSON.parse(inProgress).interests || [] : [],
    }
  }

  handleSubmit(event){
    event.preventDefault()
    if (this.validateFields()) {
      /* prompt user to login if not logged in? */
      let cleanedFields = this.preparedFields(this.state)
      this.props.addProject(cleanedFields)
    } else {
      // error status
    }
  }

  preparedFields(fields) {
    return {...fields,
      roles: fields.roles.map(item => {return { name: item.name }}),
      skills: fields.skills.map(item => {return { name: item.name }}),
      fields: fields.interests.map(item => {return { name: item.name }})
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
    window.localStorage.setItem("project_in_progress", JSON.stringify(this.state))
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
        <form onSubmit={this.handleSubmit.bind(this)}>
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
          <button type="submit">Next</button>
        </form>
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
      </div>);
  }
}
