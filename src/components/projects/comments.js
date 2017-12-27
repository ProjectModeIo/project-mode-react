import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CommentInput from './commentinput'
import Comment from './comment'

import { submitComment } from '../../actions/projects'

class Comments extends Component {

  getReplies(parentId) {
    return this.props.currentProject.comments.filter(comment => comment.parent_id === parentId)
    // debugger;
  }

  render() {
    /* variables */
    let {currentProject} = this.props

    return (
      <div>
        <CommentInput submit={this.props.submitComment.bind(this, currentProject.id)} />
          {currentProject.comments
            .filter(comment=> comment.parent_id == null)
            .map((comment, index)=>{
              let replies = this.getReplies(comment.id)
              return (
                <Comment
                  comment={comment}
                  replies={replies}
                  currentProject={this.props.currentProject}
                  submitComment={this.props.submitComment.bind(this, currentProject.id)}/>
              )
            })}
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
    submitComment
  }, dispatch)
}

const ConnectedComments = connect(mapStateToProps, mapDispatchToProps)(Comments)

export default ConnectedComments
