import React, { Component } from 'react';
import { Route, Switch, Link} from 'react-router-dom'
import { push } from 'react-router-redux'

export default class Home extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    return (
      <div className="Home">
        home page shenanigans
      </div>
    );
  }
}
