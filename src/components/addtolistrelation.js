import React from 'react';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Autocomplete from 'react-autocomplete'
// import { listSkills, setUser, addQualification, listSkills, deleteQualification } from '../actions'
import { addUserskill, deleteUserskill, addSkill } from '../actions/skills'
import { addUserrole, deleteUserrole, addRole } from '../actions/roles'
import { addUserinterest, deleteUserinterest, addInterest } from '../actions/interests'
/*  props - add from pool to list
    - if not in pool, add to both pool and list

  e.g. props
  pool = {
    list: []
    name: "Skill"
  }

  relation = {
    list: []
    name: 'Userskill'
  }

  catName = "type" or name
  close = {
    action: action on close
    label: label for button
  }

*/

class AddToListRelation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      itemInput: ''
    }
  }

  handleChange(event) {
    this.setState({
      itemInput: event.target.value
    })
  }

  addItem() {
    let itemName = this.state.itemInput.toLowerCase();

    let inList = this.props.pool.list.filter((item) => {
      return item[this.props.catName].toLowerCase() === itemName.toLowerCase();
    })[0];

    if (!inList) {
      // add to redux pool store if new item
      this.props[`add${this.props.pool.name}`]({[this.props.catName]: itemName})
    }

    // this.props.addUserskill({type: "front-end development"})
    this.props[`add${this.props.relation.name}`]({[this.props.catName]: itemName});

    this.setState({
      itemInput: ''
    })
  }

  deleteItem(id) {
    this.props[`delete${this.props.relation.name}`](id);
  }

  matchStateToTerm(state, value) {
    // debugger;
    return (
      state[this.props.catName].toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  render() {
    let { account, pool, relation, catName, close } = this.props
    let inRelationArr = relation.list.map((item) => item[catName])

    return (
      <div>
        <Autocomplete
          getItemValue={(item) => item[catName]}
          items={pool.list.filter((item) => !inRelationArr.includes(item[catName]))}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item[catName]}
            </div>
          }
          shouldItemRender={this.matchStateToTerm.bind(this)}
          value={this.state.itemInput}
          onChange={(e) => this.setState({ itemInput: e.target.value })}
          onSelect={(val) => this.setState({ itemInput: val })}
        />
        <button onClick={this.addItem.bind(this)}>Submit</button>
        <h2>{relation.name}</h2>
        {relation.list.map((item, index) => {
          return (
            <div key={index}>
              {item[catName]}
              <button onClick={this.deleteItem.bind(this, item.id)}>x</button>
            </div>
          )
        })}
        <button onClick={close.action.bind(this)}>{close.label}</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    account: state.manageAccount,
    skills: state.manageSkills
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    /* SKILL */
    addSkill,
    deleteUserskill, addUserskill, //user
    /* ROLE */
    addRole,
    deleteUserrole, addUserrole, //user
    /* INTEREST */
    addInterest,
    deleteUserinterest, addUserinterest, //user
    push
  }, dispatch)
}

const ConnectedAddToListRelation = connect(mapStateToProps, mapDispatchToProps)(AddToListRelation)

export default ConnectedAddToListRelation
