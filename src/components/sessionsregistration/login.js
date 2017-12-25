import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { login } from '../../actions/sessionsregistration'

class Login extends React.Component {
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
      <div>
        <h3>Log In</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange.bind(this, "email")}  /><br />
          <input placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} /><br />
          <button type="submit">Log In</button>
        </form>
      </div>);
  }
}


const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    account: state.manageAccount
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login
  }, dispatch)
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
