import React, {Component} from 'react';

export default class ProjectInput extends Component {
  constructor(props) {
    super(props);

    this.state={
      title: '',
      description: ''
    }
  }

  handleSubmit(event){
    event.preventDefault()
    if (this.validateFields()) {
      this.props.addProject({
        title: this.state.title,
        description: this.state.description
      })
    } else {
      // error status
    }
  }

  validateFields() {
    let { title, description } = this.state;

    if (!title || !description) {
      return false;
    }
    return true;
  }

  handleChange(field, event){
    this.setState({
      [field]: event.target.value
    })
  }

  render() {
    return (
      <div className="account-input">
        <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="title"
            placeholder="My New Project!"
            value={this.state.title}
            onChange={this.handleChange.bind(this, "title")} /><br />
          <textarea type="description"
            placeholder="A cool description"
            value={this.state.description}
            onChange={this.handleChange.bind(this, "description")} /><br />
          <button type="submit">Next</button>
        </form>
      </div>);
  }
}
