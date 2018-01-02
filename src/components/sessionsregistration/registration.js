import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { register } from '../../actions/sessionsregistration'
import { addUserskill, deleteUserskill, addSkill } from '../../actions/skills'
import { addUserrole, deleteUserrole, addRole } from '../../actions/roles'
import { addUserinterest, deleteUserinterest, addInterest } from '../../actions/interests'
import '../../styles/home.css'

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
    if (this.props.token) {
      this.props.push('/user/dashboard') //change back to this
      // this.setState({
      //   step: 2
      // })
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.token){
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
    let { account,
      roles, addRole, addUserrole, deleteUserrole,
      skills, addSkill, addUserskill, deleteUserskill,
      interests, addInterest, addUserinterest, deleteUserinterest } = this.props

    let step = ((step)=>{
      switch(step){
        case 1:
          return (
            <div>
              <h1>Start your projects today!</h1>
              <p>Sign up in seconds and start collaborating!</p>
              <AccountInput
                token={this.props.token}
                register={this.props.register}
                />
              <Link to={'/login'} >Already have an account?  Login!</Link>
            </div>
          )
        case 2:
          return (
            <div className="account-input edit-homepage_header">
              <h1>Thanks for joining us!</h1>
              <p>Tell us a little bit more about yourself so we can
                show you projects relevant to your skills and interests.
                You can also edit this later.
              </p>
              <AddToListRelation
                pool = {{ list: roles, action: addRole.bind(this) }}
                relation = {{ list: account.roles, action: addUserrole.bind(this), delete: deleteUserrole.bind(this) }}
                catName = "name"
                showList={true}
                title = "What's your preferred role?"
                />
              <AddToListRelation
                pool = {{ list: skills, action: addSkill.bind(this) }}
                relation = {{ list: account.skills, action: addUserskill.bind(this), delete: deleteUserskill.bind(this) }}
                catName = "name"
                showList={true}
                title = "What are your skills?"
                />
              <AddToListRelation
                pool = {{ list: interests, action: addInterest.bind(this) }}
                relation = {{ list: account.interests, action: addUserinterest.bind(this), delete: deleteUserinterest.bind(this) }}
                catName = "name"
                showList={true}
                title = "What are some of your interests?"
                />
              <button className="next-button next-button_home theme1_1" onClick={() => { this.setState({ step: 3 })}}>Next</button>
            </div>
          )
        case 3:
          setTimeout(()=>{
            this.props.push('/user/dashboard');
          }, 1500)
          return (
            <div className="account-input edit-homepage_header">
              <h1>Congrats, you're all signed up!  Redirecting you now...</h1>
            </div>
          )
      }
    })(this.state.step);

    return (
      <div className="home_banner theme1_4">
        {step}
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
    push, register,
    /* SKILL */
    addSkill,
    deleteUserskill, addUserskill, //user
    /* ROLE */
    addRole,
    deleteUserrole, addUserrole, //user
    /* INTEREST */
    addInterest,
    deleteUserinterest, addUserinterest, //user
  }, dispatch)
}

const ConnectedRegistration = connect(mapStateToProps, mapDispatchToProps)(Registration)

export default ConnectedRegistration
