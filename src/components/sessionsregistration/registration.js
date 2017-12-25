import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { register } from '../../actions/sessionsregistration'
import { listSkills } from '../../actions/skills'
import { listRoles } from '../../actions/roles'
import { listInterests } from '../../actions/interests'

import AccountInput from './accountinput'
import AddToListRelation from '../addtolistrelation'

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    }
  }

  componentWillMount(){
    this.props.listSkills();
    this.props.listRoles();
    this.props.listInterests();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.account.firstname && this.props.account.firstname && this.state.step === 1) {
      this.setState({
        step: 2
      })
    }
  }

  nextStep(step) {
    this.setState({
      step: step
    })
  }

  render() {
    let { account, skills, roles, interests } = this.props
    let step = ((step)=>{
      switch(step){
        case 1:
          return (<AccountInput
            token={this.props.token}
            register={this.props.register}
            nextStep={this.nextStep.bind(this, 2)}
            />)
        case 2:
          return (<div>
            <h1>Welcome, {account.firstname ? account.firstname.charAt(0).toUpperCase() + account.firstname.slice(1) : null}, what are your roles?</h1>
            <AddToListRelation
              pool = {{ list: roles, name: "Role" }}
              relation = {{ list: account.roles, name: "Userrole" }}
              catName = "type"
              close = {{ action: this.nextStep.bind(this, 3), label: "next"}}
              />
          </div>)
        case 3:
          return (<div>
            <h1>Welcome, {account.firstname ? account.firstname.charAt(0).toUpperCase() + account.firstname.slice(1) : null}, add your skills!</h1>
            <AddToListRelation
              pool = {{ list: skills, name: "Skill" }}
              relation = {{ list: account.skills, name: "Userskill" }}
              catName = "name"
              close = {{ action: this.nextStep.bind(this, 4), label: "next"}}
              />
          </div>)
        case 4:
        return (
          <div>
            <h1>Welcome, {account.firstname ? account.firstname.charAt(0).toUpperCase() + account.firstname.slice(1) : null}, add your interests!</h1>
            <AddToListRelation
              pool = {{ list: interests, name: "Interest" }}
              relation = {{ list: account.interests, name: "Userinterest" }}
              catName = "name"
              close = {{ action: this.nextStep.bind(this, 5), label: "next"}}
              />
          </div>)
        case 5:
          setTimeout(()=>{
            this.props.push('/dashboard');
          }, 2000)
          return <div>Congrats, you're all signed up!  Redirecting you now...</div>
      }
    })(this.state.step);

    return (
      <div>
        {step}
        hello
        {this.props.status.error ? <div>{this.props.status.error}</div>: null}
      </div>);
  }
}


const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    skills: state.manageSkills,
    roles: state.manageRoles,
    interests: state.manageInterests,
    account: state.manageAccount,
    status: state.manageStatus
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, register, listSkills, listRoles, listInterests
  }, dispatch)
}

const ConnectedRegistration = connect(mapStateToProps, mapDispatchToProps)(Registration)

export default ConnectedRegistration
