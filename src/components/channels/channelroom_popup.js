import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import '../../styles/chat.css'

import { connectToChannel, leaveChannel, createMessage, composeMessage } from '../../actions/rooms'

class ChannelRoomPopup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      persist: false, // actions for persist -> expand out of window?  not sure
      connected: false,
      minified: false
    }
  }

  componentWillMount() {
    if (window.localStorage.getItem("chatbox_state")) {
      let state = JSON.parse(window.localStorage.getItem("chatbox_state"))[this.props.id] || {}
      if (state.persist) {
        this.loadChat()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
    // let nextId = nextProps.id
    // let currentId = this.props.id
    //
    // if (nextId !== currentId) {
    //   if (this.props.rooms[currentId]) {
    //     this.props.leaveChannel(this.props.rooms[currentId].channel, currentId)
    //   }
    //   this.props.connectToChannel(nextProps.socket, nextId)
    // }
    // if (!this.props.socket && nextProps.socket) {
    //   this.props.connectToChannel(nextProps.socket, nextId)
    // }
  }

  saveState() {
    let store = window.localStorage.getItem("chatbox_state")
    let state = store ? JSON.parse(store) : {}
    state[this.props.id] = this.state
    window.localStorage.setItem("chatbox_state", JSON.stringify(state))
  }

  loadChat() {
    if (this.props.id) {
      console.log('connecting chat')
      this.props.connectToChannel(this.props.socket, this.props.id)
      this.setState({
        connected: true
      }, () => {
        this.saveState()
      })
    }
  }

  closeChat() {
    let id = this.props.id
    if (this.props.rooms[id]) {
      console.log('closing chat')
      this.props.leaveChannel(this.props.rooms[id].channel, id)
    }
  }

  minifyChat() {
    console.log('minifying chat')
    this.setState({
      minified: true
    }, () => {
      this.saveState()
    })
  }

  componentWillUnmount() {
    this.closeChat();
  }

  handleSubmit(event) {
    event.preventDefault()
    let id = this.props.id
    let currentMessage = this.props.rooms[this.props.id].currentMessage
    this.props.createMessage(this.props.rooms[id].channel, {text: currentMessage})
  }

  handleChange(event) {
    let id = this.props.id
    this.props.composeMessage(id, event.target.value)
  }


  renderNotConnected() {
    return (
      <div>
        <button onClick={this.loadChat.bind(this)}>Load Chatroom</button>
      </div>
    )
  }

  renderLoading() {
    return (
      <div>Loading room...</div>
    )
  }

  renderChatBox() {
    let {messages, info, currentMessage } = this.props.rooms[this.props.id]

    return (
      <div className="chatbox-wrapper">
        <h1 className="chatbox__top">{info.name} chat</h1>
        {/* message list*/}
        <div className="chatbox__main">
          {messages.map(message => {
            return (
              <div className="">
                <p>
                  <span style={{fontWeight: "700"}}>{message.user.username}: </span>
                  {message.text}
                </p>
                <p>{message.inserted_at}</p>
              </div>)
            })}
        </div>
        {/* message input*/}
        <form className="chatbox__input" onSubmit={this.handleSubmit.bind(this)}>
          <input
            onChange={this.handleChange.bind(this)}
            value={currentMessage} type="text" />
          <button type="submit">submit</button>
        </form>
      </div>
    )
  }

  render() {
    if (this.state.connected) {
      // chat stuff
      if (this.props.rooms[this.props.id]) {
        let {messages, info, currentMessage } = this.props.rooms[this.props.id]
        return this.renderChatBox()
      } else {
        return this.renderLoading()
      }
    } else {
      return this.renderNotConnected()
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    socket: state.manageLogin.socket,
    rooms: state.manageRooms.channels
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push,
    connectToChannel, leaveChannel, createMessage, composeMessage
  }, dispatch)
}

const ConnectedChannelRoomPopup = connect(mapStateToProps, mapDispatchToProps)(ChannelRoomPopup)

export default ConnectedChannelRoomPopup
