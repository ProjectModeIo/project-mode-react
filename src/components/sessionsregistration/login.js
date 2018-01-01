import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { login } from '../../actions/sessionsregistration'
import LoginInput from './logininput'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginStatus.logged_in) {
      this.props.push('/user/dashboard')
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
      <div className="home_banner theme1_4">
        <LoginInput
          loginStatus={this.props.loginStatus}
          status={this.props.status}
          login={this.props.login}
          />
        <Link to={'/registration'} >Don't have an account?  Register!</Link>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return ({
    loginStatus: state.manageLogin,
    status: state.manageStatus,
    account: state.manageAccount
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login, push
  }, dispatch)
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
