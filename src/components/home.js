import React, { Component } from 'react';
import { Route, Switch, Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import '../styles/home.css'

export default class Home extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    return (
      <div className="Home">
        <div className="home_banner one">
          <h1>Create. Communicate. Collaborate.</h1>
          <p>ProjectMode.io is here to bring developers, designers, and entrepreneurs
            together to help make ideas into reality.  Whether it's a passion project,
            fun experiments, or an overwhelming-yet-unmet need for your community,
            find likeminded people and start working together.
          </p>
        </div>
        <div className="home_banner two">
          <h1>What's are you working on?</h1>
        </div>
      </div>
    );
  }
}
