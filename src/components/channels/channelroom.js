import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { connectToChannel, leaveChannel, createMessage } from '../../actions/rooms'

class ChannelRoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  componentWillMount() {
    this.props.connectToChannel(this.props.socket, this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    let nextId = nextProps.match.params.id
    let currentId = this.props.match.params.id

    if (nextId !== currentId) {
      this.props.leaveChannel(this.props.rooms[currentId].channel, currentId)
      this.props.connectToChannel(nextProps.socket, nextId)
    }
    if (!this.props.socket && nextProps.socket) {
      this.props.connectToChannel(nextProps.socket, nextId)
    }
  }

  componentWillUnmount() {
    let id = this.props.match.params.id
    this.props.leaveChannel(this.props.rooms[id].channel, id)
  }

  handleSubmit(event) {
    event.preventDefault()
    let id = this.props.match.params.id
    this.props.createMessage(this.props.rooms[id].channel, {text: this.state.message})
  }

  render() {
    /* variables */
    if (this.props.rooms[this.props.match.params.id]) {
      let {messages, info} = this.props.rooms[this.props.match.params.id]

      return (
        <div>
          <h1>{info.name}</h1>
          {/* message list*/}
          {messages.map(message => {
            return (<div>{message.text}</div>)
          })}
          {/* message input*/}
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              onChange={(event)=>{ this.setState({ message: event.target.value }) }}
              value={this.state.message} type="text" />
            <button type="submit">submit</button>
          </form>
        </div>
      )
    } else {
      return <div>Loading room...</div>
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    socket: state.manageLogin.socket,
    status: state.manageStatus,
    account: state.manageAccount,
    rooms: state.manageRooms.channels
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, connectToChannel, leaveChannel,
    createMessage
  }, dispatch)
}

const ConnectedChannelRoom = connect(mapStateToProps, mapDispatchToProps)(ChannelRoom)

export default ConnectedChannelRoom
