import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addProject, clearProject } from '../../actions/projects'
import { addSkill } from '../../actions/skills'
import { addRole } from '../../actions/roles'
import { addInterest } from '../../actions/interests'
import { login, register } from '../../actions/sessionsregistration'

import ProjectInput from './projectinput'
import EditProject from './editproject'
import AccountInput from '../sessionsregistration/accountinput'
import LoginInput from '../sessionsregistration/logininput'

class NewProjectHomepage extends React.Component {
  constructor(props) {
    super(props);



    this.options = [
      {
        role: "developer",
        purpose: "to create a publicly accessible API of climbing regions",
        interest: "climbing"
      },
      {
        role: "web designer",
        purpose: "to collect an index of free resources and tutorials",
        interest: "graphic design"
      },
      {
        role: "data scientist",
        purpose: "to render NASA data",
        interest: "space"
      }
    ]

    this.state = {
      login: false,
      savedDraft: false,
      adding: false,
      step: "introStep",
      params: null,
      form: {
        purpose: "title",
        description: "description",
        role: "developer"
      }
    }
  }

  componentWillMount(){
    if (window.localStorage.getItem("project_in_progress")) {
      this.setState({
        savedDraft: true,
        step: "editProjStep"
      })
    }

    let rand = Math.floor(Math.random()*(this.options.length));
    this.setState({
      form: {... this.state.form,
        role: this.options[rand].role,
        purpose: this.options[rand].purpose,
        interest: this.options[rand].interest
      }
    })

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.step == "loginStep" && this.props.logged_in) {
      if (this.props.currentProject.id) {
        this.props.push(`/u/${this.props.currentProject.created_by}/${this.props.currentProject.slug}`)
      } else if (!this.state.adding) {
        let params = this.state.params || JSON.parse(window.localStorage.getItem('project_in_progress'))
        this.props.addProject(params)
        this.setState({
          adding: true
        })
      }
    }
  }

  handleChange(field, event){
    this.setState({
      form: Object.assign({}, this.state.form, {
        [field]: event.target.value
      })
    })
  }

  addProjectLoginLogic(params) {
    /* projectinfo component already saves params in localStorage */
    this.setState({
      step: "loginStep",
      params: params
    })

    if (this.props.logged_in) {
      this.props.addProject(params)
      this.setState({
        adding: true
      })
    }
  }

  generateProject() {
    let projData = {
      title: `A ${this.state.form.interest} project`,
      description: `I am working ${this.state.form.purpose}`,
      roles: [{name: this.state.form.role, id: 0}],
      skills: [],
      interests: [{name: this.state.form.interest, id: 0}],
    }

    window.localStorage.setItem('project_in_progress', JSON.stringify(projData))
  }

  render() {
    /*
    FLOW:
    logged in -> project input -> push to project/new with info saved with param ?step=2
    not logged in -> project input -> login or register to save -> once user is set -> push to project/new with info saved
    */


    /* variables */
    let { logged_in,
      currentProject, clearProject, titleLine,
      roles, addRole, skills, addSkill, interests, addInterest} = this.props

    let roleInputStyle = {
      width: (this.state.form.role.length * 14) + 10 + "px", // keep
    }
    let purposeInputStyle = {
      width: (this.state.form.purpose.length * 14) + 10 + "px", // keep
    }
    let interestInputStyle = {
      width: (this.state.form.interest.length * 14) + 10 + "px", // keep
    }

    let LoginRegistration = this.state.login ? (
      <LoginInput
        loginStatus={this.props.loginStatus}
        status={this.props.status}
        login={this.props.login}
        />
    ) : (
      <AccountInput
        token={this.props.token}
        register={this.props.register}
        />
    )
    /* steps */
    let step = ((step) => {
      switch(step) {
        case "introStep":
          return (
            <div className="edit-homepage_header">
              <h1>What are you working on?</h1>
              <h2>I am a
                <input
                  className="edit-homepage_input yellow-hover"
                  type="text"
                  placeholder={this.state.form.role}
                  onChange={this.handleChange.bind(this, "role")}
                  style={roleInputStyle} /> working
                <br />
                <input
                  className="edit-homepage_input green-hover"
                  type="text"
                  placeholder={this.state.form.purpose}
                  onChange={this.handleChange.bind(this, "purpose")}
                  style={purposeInputStyle} />
                <br />
                to benefit the
                <input
                  className="edit-homepage_input blue-hover"
                  type="text"
                  placeholder={this.state.form.interest}
                  onChange={this.handleChange.bind(this, "interest")}
                  style={interestInputStyle} />
                community.
              </h2>
              <button className="next-button" onClick={()=>{
                  this.generateProject();
                  this.setState({ step: "editProjStep" })}}>
                Let's get to work
              </button>
            </div>
          )
        case "editProjStep":
          return(
            <div className="edit-homepage_header">
              <h1>{this.state.savedDraft ? "We saved your progress!":"Fine-tune your project"}</h1>
              <p>
                Tell us more about your project!  What technologies and techniques do you use?<br />
                Who is the targeted audience?  What are you looking for in collaborators?
              </p>
              <ProjectInput
                roles={roles}
                skills={skills}
                interests={interests}
                addRole={addRole.bind(this)}
                addSkill={addSkill.bind(this)}
                addInterest={addInterest.bind(this)}
                addProject={this.addProjectLoginLogic.bind(this)}
                />
            </div>
          )
        case "loginStep":
          return (
            <div>
              {
                logged_in ?
                <h1>Hold tight, we're bringing you to your project...</h1> :
                <div>
                  <h1>Login or Register to save your progress!</h1>
                  <button onClick={()=>{ this.setState({ login: !this.state.login })}}>Login Or Register</button>
                  {LoginRegistration}
                </div>
              }

            </div>
          )
      }
    })(this.state.step);

    return (
      <div>
        {step}
      </div>);
  }
}


const mapStateToProps = (state) => {
  return ({
    loginStatus: state.manageLogin,
    logged_in: state.manageLogin.logged_in,
    skills: state.manageSkills,
    roles: state.manageRoles,
    interests: state.manageInterests,
    status: state.manageStatus,
    currentProject: state.manageCurrentProject
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login, register,
    push, addProject, clearProject,
    addSkill, addRole, addInterest
  }, dispatch)
}

const ConnectedNewProjectHomepage = connect(mapStateToProps, mapDispatchToProps)(NewProjectHomepage)

export default ConnectedNewProjectHomepage
