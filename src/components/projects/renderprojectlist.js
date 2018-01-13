import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ListProjects from './listprojects'

const RenderProjectList = (props) => {
  if (props.list && props.list.length > 0) {
    let list = props.list;
    if (props.limit && props.limit > 0) {
      list = props.list.slice(0, props.limit)
    }

    return (
      <div>
        <h3>{props.title}</h3>
        <ListProjects
          list={list}
          account={props.account}
          />
        {props.link ? <Link to={props.link.path}>{props.link.name}</Link> : null}
      </div>
    )
  }
  return false
}

export default RenderProjectList
