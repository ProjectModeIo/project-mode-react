import React from 'react';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Autocomplete from 'react-autocomplete'

/*  props - add from pool to list
    - if not in pool, add to both pool and list

  e.g. props
  pool = {
    list: [], action:
  }

  relation = {
    list: [], action
  }

  catName = "type" or name
  close = {
    action: action on close
    label: label for button
  }

*/

export default class AddToListRelation extends React.Component {
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
      this.props.pool.action({[this.props.catName]: itemName})
    }

    // this.props.addUserskill({type: "front-end development"})
    this.props.relation.action({[this.props.catName]: itemName});

    this.setState({
      itemInput: ''
    })
  }

  deleteItem(id) {
    this.props.relation.delete(id);
  }

  matchStateToTerm(state, value) {
    // debugger;
    return (
      state[this.props.catName].toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  render() {
    let { pool, relation, catName, close, title } = this.props
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
        <h2>{title}</h2>
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
