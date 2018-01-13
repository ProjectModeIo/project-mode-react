import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { loadProject, loadProjectBySlug, clearProject } from '../../actions/projects'

import Comments from './comments'
import EditProject from './editproject'
import DisplayProject from './displayproject'

class ShowProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false
    }
  }

  componentWillMount() {
    let { username, slug, id } = this.props.match.params

    if (id) {
      this.props.loadProject(id);
    } else if (slug) {
      this.props.loadProjectBySlug(username, slug);
    }
    // eventually check query params for editing maybe??
  }

  componentWillReceiveProps(nextProps) {
    let { username, slug, id } = nextProps.match.params

    if (slug) {
      if (this.props.match.params.username !== this.props.match.params.username || this.props.match.params.slug !== slug) {
        // debugger;
        this.props.loadProjectBySlug(username, slug)
      }
    } else if (id) {
      if (this.props.match.params.id !== id) {
        // debugger;
        this.props.loadProject(id);
      }
    }
  }

  componentWillUnmount() {
    this.props.clearProject();
  }

  render() {
    /* variables */
    let {currentProject, account} = this.props
    let {editing} = this.state

    /* project creator admin */
    let isOwner = currentProject.created_by === account.username;
    let adminBox = (
      <div>
        <button onClick={()=>{this.setState({editing: !editing})}}>
          {editing ? "done":"edit"}
        </button>
      </div>
    )

    return (
      <div>
        {isOwner ? adminBox : null}
        {isOwner && editing ? <EditProject />:<DisplayProject />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    status: state.manageStatus,
    account: state.manageAccount,
    currentProject: state.manageCurrentProject
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, loadProject, loadProjectBySlug, clearProject
  }, dispatch)
}

const ConnectedShowProject = connect(mapStateToProps, mapDispatchToProps)(ShowProject)

export default ConnectedShowProject
