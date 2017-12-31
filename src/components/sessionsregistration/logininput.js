import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom'
import { push } from 'react-router-redux'

export default class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.login({
      email: this.state.email,
      password: this.state.password})
  }

  handleChange(field, e){
    this.setState({
      [field]: e.target.value
    })
  }

  render() {
    return (
      <div className="account-input edit-homepage_header">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="account-input_input edit-homepage_input yellow-hover"
            placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange.bind(this, "email")}  /><br />
          <input
            className="account-input_input edit-homepage_input yellow-hover"
            placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} /><br />
          <button
            className="next-button"
            type="submit">Log In</button>
        </form>

        {this.props.status.error ? <div>{this.props.status.error}</div>: null}
      </div>);
  }
}
