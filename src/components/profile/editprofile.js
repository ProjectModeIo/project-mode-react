import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import '../../styles/profile.css'
import { editProfile } from '../../actions/user'
import { addUserskill, deleteUserskill, addSkill } from '../../actions/skills'
import { addUserrole, deleteUserrole, addRole } from '../../actions/roles'
import { addUserinterest, deleteUserinterest, addInterest } from '../../actions/interests'

import AddToListRelation from '../addtolistrelation'
import ListDisplay from '../listdisplay'

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unsavedChanges: false,
      firstname: '',
      lastname: '',
      tagline: ''
    }
  }

  componentDidUpdate() {
    this.determineChange()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account.id) {
      this.setState({
        firstname: nextProps.account.firstname,
        lastname: nextProps.account.lastname,
        tagline: nextProps.account.tagline
      })
    }
  }

  determineChange() {
    let {firstname, lastname, tagline} = this.props.account

    if (!this.state.unsavedChanges) {
      if (this.state.firstname !== firstname || this.state.lastname !== lastname || this.state.tagline !== tagline ) {
          this.setState({
            unsavedChanges: true
          })
        }
    } else {
      if (this.state.firstname === firstname && this.state.lastname === lastname && this.state.tagline === tagline ) {
          this.setState({
            unsavedChanges: false
          })
        }
    }
  }

  handleSave() {
    this.props.editProfile({
      user: {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        tagline: this.state.tagline
      }
    })
  }

  handleChange(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  render() {
    let { account,
      roles, addRole, addUserrole, deleteUserrole,
      skills, addSkill, addUserskill, deleteUserskill,
      interests, addInterest, addUserinterest, deleteUserinterest } = this.props

    let { username, email } = this.props.account

    /* styles - move over to classes */
    let fnameStyle = {
      width: (this.state.firstname.length * 10) + 10 + "px", // keep
    }
    let lnameStyle = {
      width: (this.state.lastname.length * 10) + 10 + "px", // keep
    }
    let tagStyle = this.state.tagline ? {
      width: (this.state.tagline.length * 10) + 10 + "px", // keep
    } : {width: '30px'};


    return (
      <div>
        <div>
          <div>
            {this.state.unsavedChanges ? <button onClick={this.handleSave.bind(this)}>Save</button>:null}
            <h2>Hello,
              <input
                className="edit-profile_input"
                onChange={this.handleChange.bind(this, 'firstname')}
                value={this.state.firstname}
                type="text"
                style={fnameStyle} />
              <input
                className="edit-profile_input"
                onChange={this.handleChange.bind(this, 'lastname')}
                value={this.state.lastname}
                type="text"
                style={lnameStyle} /></h2>
            <input
              className="edit-profile_input"
              onChange={this.handleChange.bind(this, 'tagline')}
              value={this.state.tagline}
              type="text"
              style={tagStyle} />
            <p>Username: {username}</p>
            <p>Email: {email}</p>
          </div>
          <div>You are a
            <ListDisplay
              list={account.roles}
              customProps={{ listClass: 'inline-list__wrap', itemClass: 'inline-list__item' }}
              customActions={{ itemClick: deleteUserrole.bind(this), attr: "id" }}
              catName = "name"
              />
            <AddToListRelation
              pool = {{ list: roles, action: addRole.bind(this) }}
              relation = {{ list: account.roles, action: addUserrole.bind(this), delete: deleteUserrole.bind(this) }}
              catName = "name"
              showList = {false}
              customProps = {{ outerWrapStyle: { display: "inline-block"} }}
              />
          </div>
          <div>You specialize in
            <ListDisplay
              list={account.skills}
              customProps={{ listClass: 'inline-list__wrap', itemClass: 'inline-list__item' }}
              customActions={{ itemClick: deleteUserskill.bind(this), attr: "id" }}
              catName="name"
              />
            <AddToListRelation
              pool = {{ list: skills, action: addSkill.bind(this) }}
              relation = {{ list: account.skills, action: addUserskill.bind(this), delete: deleteUserskill.bind(this) }}
              catName = "name"
              showList = {false}
              customProps = {{ outerWrapStyle: { display: "inline-block"} }}
              />
          </div>
          <div>You're interested in
            <ListDisplay
              list={account.interests}
              customProps={{ listClass: 'inline-list__wrap', itemClass: 'inline-list__item' }}
              customActions={{ itemClick: deleteUserinterest.bind(this), attr: "id" }}
              catName="name"
              />
            <AddToListRelation
              pool = {{ list: interests, action: addInterest.bind(this) }}
              relation = {{ list: account.interests, name: "Userinterest", action: addUserinterest.bind(this), delete: deleteUserinterest.bind(this) }}
              catName = "name"
              showList = {false}
              customProps = {{ outerWrapStyle: { display: "inline-block"} }}
              />
          </div>
        </div>


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
    push, editProfile,
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

const ConnectedEditProfile = connect(mapStateToProps, mapDispatchToProps)(EditProfile)

export default ConnectedEditProfile
