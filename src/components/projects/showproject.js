import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { loadProject, loadProjectBySlug, clearProject } from '../../actions/projects'

class ShowProject extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let { slug, id } = this.props.match.params
    // debugger;
    if (id) {
      this.props.loadProject(id);
    } else if (slug) {
      // debugger;
      this.props.loadProjectBySlug(slug);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { slug, id } = nextProps.match.params
    if (slug) {
      if (this.props.match.params.slug !== slug) {
        debugger;
        this.props.loadProjectBySlug(slug)
      }
    } else if (id) {
      if (this.props.match.params.id !== id) {
        debugger;
        this.props.loadProject(id);
      }
    }
  }

  componentWillUnmount() {
    this.props.clearProject();
  }

  render() {
    /* variables */
    let {currentProject} = this.props

    return (
      <div>
        <h1>{currentProject.title}</h1>
        <p>{currentProject.description}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    status: state.manageStatus,
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
