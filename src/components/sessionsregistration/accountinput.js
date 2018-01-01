import React, {Component} from 'react';
import api from '../../api';
import FontAwesome from 'react-fontawesome'
import { titleize } from '../../utilities'
import debounce from 'lodash/debounce';

export default class AccountInput extends Component {
  constructor(props) {
    super(props);

    this.state={
      email_check: '',
      email_valid: null,
      username_check: '',
      username_valid: null,
      password_check: '',
      password_valid: null,
      password_confirmation_check: '',
      password_confirmation_valid: null,
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      // firstname: '',
      // lastname: ''
    }

    this.tooltip = {
      username: "Between 6-16 characters: alphanumeric, underscore, and dashes only.",
      password: "Between 6-16 characters: at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol"
    }

    this.validation.email = debounce(this.validation.email.bind(this), 1000);
    this.validation.username = debounce(this.validation.username.bind(this), 1000);
    this.validation.password = debounce(this.validation.password.bind(this), 700);
    this.validation.password_confirmation = debounce(this.validation.password_confirmation.bind(this), 700);
    this.handleFocus = this.handleFocus.bind(this)
  }

  validation = {
    email: () => {
      if (this.state.email.length === 0) {
        return;
      }

      this.setState({
        email_check: "checking..."
      })
      let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let email = this.state.email
      if (emailRegex.test(email.toLowerCase())) {
        this.validateExists("email", { email: this.state.email })
      } else {
        this.setState({
          email_valid: false,
          email_check: "Please enter a valid email"
        })
      }
    },
    username: () => {
      if (this.state.username.length === 0) {
        return;
      }

      this.setState({ username_check: "checking..." })
      if (this.state.username.length > 3 && this.state.username.length < 16) {
        this.validateExists("username", { username: this.state.username })
      } else {
        this.setState({
          username_valid: false,
          username_check: "Too short"
        })
      }
    },
    password: () => {
      if (this.state.password.length === 0) {
        return;
      }

      /* at least 1 number, 1 capital letter, 1 lowercase letter, 1 symbol */
      let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (reg.test(this.state.password)) {
        this.setState({
          password_check: "Success",
          password_valid: true
        })
        if (this.state.password_confirmation !== this.state.password) {
          this.setState({
            password_confirmation_check: "Password confirmation does not match",
            password_confirmation_valid: false
          })
        }
      } else {
        this.setState({
          password_check: "Invalid password format",
          password_valid: false
        })
      }
    },
    password_confirmation: () => {
      if (this.state.password_confirmation.length === 0) {
        return;
      }
      if (this.state.password === this.state.password_confirmation) {
        this.setState({
          password_confirmation_check: "Passwords match!",
          password_confirmation_valid: true
        })
      } else {
        this.setState({
          password_confirmation_check: "Password confirmation does not match",
          password_confirmation_valid: false
        })
      }
    }
  }

  handleFocus(field, event) {
    this.setState({
      currentEdit: field
    })
    this.validation[field].cancel();
  }

  validateExists(field, params) {
    api.post("/validate", params)
    .then(({data}) => {
      if (data.status == "ok") {
        this.setState({
          [`${field}_valid`]: true,
          [`${field}_check`]: 'available'
        })
      } else if (data.status == "already exists") {
        this.setState({
          [`${field}_valid`]: false,
          [`${field}_check`]: data.status
        })
      }
    })
    .catch((errors) => {
      debugger;
    })
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.register({
      email: this.state.email,
      username: this.state.username,
      // firstname: this.state.firstname,
      // lastname: this.state.lastname,
      password: this.state.password
    })
  }

  validateFields() {
    let { email, username, password,
      email_valid, username_valid, password_valid, password_confirmation_valid
     } = this.state;

    if (!email || !username || !email_valid || !username_valid ||
      !password || !password_valid || !password_confirmation_valid) {
      return false;
    }
    return true;
  }

  handleChange(field, event){
    if (event.target.value.length > 0 && field.includes("password")) {
      this.validation[field]();
    }
    this.setState({
      [field]: event.target.value
    })
  }

  renderValidationField(field, onAction) {
    let type;
    if (field === "email") {
      type = "email"
    } else if (field.includes("password")) {
      type = "password"
    } else {
      type = "text"
    }

    return (
      <div className="account-input_input-wrap">
        <input
          className={`account-input_input edit-homepage_input ${
            this.state[`${field}_valid`] === false ? "has-error":
            this.state[`${field}_valid`] === true ? "is-valid":""
          }`}
          type={type}
          onFocus={this.handleFocus.bind(this, field)}
          onBlur={this.validation[field]}
          placeholder={titleize(field)}
          value={this.state[field]}
          onChange={this.handleChange.bind(this, field)} />
        {this.state.currentEdit === field ?
          <div className="account-input_tool-tip">{this.tooltip[field]}</div>
          :null}
        {this.state[`${field}_check`] ?
          <div className="input-status">
            {this.state[`${field}_valid`] ? <FontAwesome name="check" /> : <FontAwesome name="close" />}
            <span className="input-status_message">{this.state[`${field}_check`]}</span>
          </div>
          :null}
      </div>
    )
  }

  render() {
    // <input
    //   className="account-input_input edit-homepage_input yellow-hover"
    //   type="text" placeholder="First Name" value={this.state.firstname} onChange={this.handleChange.bind(this, "firstname")} /><br />
    // <input
    //   className="account-input_input edit-homepage_input yellow-hover"
    //   type="text" placeholder="Last Name" value={this.state.lastname} onChange={this.handleChange.bind(this, "lastname")} /><br />
    //
    return (
      <div className="account-input edit-homepage_header">
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.renderValidationField("email")}
          {this.renderValidationField("username")}
          {this.renderValidationField("password")}
          {this.renderValidationField("password_confirmation")}
          {this.validateFields() ?
            <button className="next-button theme1_1" type="submit">
              Next
            </button>:null
          }
        </form>
      </div>);
  }
}
