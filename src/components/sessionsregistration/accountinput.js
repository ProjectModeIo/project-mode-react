import React, {Component} from 'react';

export default class AccountInput extends Component {
  constructor(props) {
    super(props);

    this.state={
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.token){
      this.props.nextStep()
    }
  }

  handleSubmit(event){
    event.preventDefault()
    if (this.validateFields()) {
      this.props.register({
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        password: this.state.password
      })
    } else {
      // error status
    }
  }

  validateFields() {
    let { email, firstname, lastname, password } = this.state;

    if (!email || !firstname || !lastname || !password) {
      return true;
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
          <input type="firstname" placeholder="John" value={this.state.firstname} onChange={this.handleChange.bind(this, "firstname")} /><br />
          <input type="lastname" placeholder="Smith" value={this.state.lastname} onChange={this.handleChange.bind(this, "lastname")} /><br />
          <input type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this, "email")} /><br />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} /><br />
          <button type="submit">Register</button>
        </form>
      </div>);
  }
}
