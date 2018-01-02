import React, { Component } from 'react';
import ListProjects from './listprojects'

const RenderProjectList = (props) => {
  if (props.list && props.list.length > 0) {
    return (
      <div>
        <h3>{props.title}</h3>
        <ListProjects
          list={props.list}
          account={props.account}
          />
      </div>
    )
  }
  return false
}

export default RenderProjectList
