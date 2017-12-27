import React, {Component} from 'react';

export default class CommentInput extends Component {
  constructor(props) {
    super(props);

    this.state={
      body: ''
    }
  }

  handleSubmit(event){
    event.preventDefault()
    if (this.validateFields()) {
      let commentParams = {
        comment: {
          body: this.state.body
        }
      };
      // debugger;
      if (this.props.parentId) {
        commentParams.comment.parent_id = this.props.parentId
      }

      this.props.submit(commentParams)

      if (this.props.submitted) {
        this.props.submitted()
      }

      this.setState({
        body: ''
      })
    } else {
      // error status
    }
  }

  validateFields() {
    let { body } = this.state;

    if (!body) {
      return false;
    }
    return true;
  }

  handleChange(field, event){
    this.setState({
      [field]: event.target.value
    })
  }

  render() {
    return (
      <div className="comment-input">
        <h3>Comment: </h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <textarea type="text" placeholder="What say you?" value={this.state.body} onChange={this.handleChange.bind(this, "body")} /><br />
          <button type="submit">Submit</button>
        </form>
      </div>);
  }
}
