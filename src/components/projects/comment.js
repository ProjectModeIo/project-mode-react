import React from 'react';
import CommentInput from './commentinput'

class Comment extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      reply: false
    }
  }

  submitComment(comment){
    let payload = {
      comment: {
        parent_id: this.props.comment.id,
        body: comment
      }
    }
    this.props.submitComment(this.props.token, this.props.currentProject.id, payload)
    this.setState({ reply: false })
  }

  getReplies(parentId) {
    // debugger;
    return this.props.currentProject.comments.filter(comment => comment.parent_id === parentId)
  }

  render() {

    let replies = [];

    if(this.props.replies) {
      replies = this.props.replies.map((comment, index) => {
       return (
         <Comment key={index}
           comment={comment}
           replies={this.getReplies(comment.id)}
           currentProject={this.props.currentProject}
           submitComment={this.props.submitComment.bind(this)} />
       );
     });
    }

    let {id, body, commenter, inserted_at} = this.props.comment

    return (
      <div className="comment" id={id} style={{paddingLeft: "20px", borderLeft: "1px solid #eee", textAlign: "left"}}>
        <div className="comment_meta">{commenter} says ({inserted_at})</div>
        <div className="comment_body">{body}</div>
        <div className="comment_reply">
          <span className="is-link" onClick={()=>{this.setState({reply: !this.state.reply})}}>reply</span>
            {this.state.reply ? <div className="comment_reply-input">
              <CommentInput
                parentId={id}
                submit={this.props.submitComment.bind(this)}
                submitted={()=> { this.setState({reply: false })}}/></div>: null}
        </div>

        { replies.length > 0 ? replies : null}
      </div>
    );
  }
}

export default Comment
