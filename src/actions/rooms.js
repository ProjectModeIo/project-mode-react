import {batchActions} from 'redux-batched-actions';

export const connectToChannel = (socket, id) => {
  return (dispatch) => {
    if (!socket) {
      return false;
    }

    let channel = socket.channel(`rooms:${id}`)
    channel.on('message_created', (message) => {
      // debugger;
      dispatch(batchActions([{
        type: "CHANNEL_MESSAGE_CREATED",
        payload: {
          id: id,
          messages: message
        }
      },
      {
        type: "RESET_MESSAGE",
        payload: id
      }]))
    })

    channel.join().receive('ok', (response) => {
      // debugger;
      dispatch({
        type: "CONNECTED_TO_CHANNEL",
        payload: {
          id: id,
          room: response.room,
          channel: channel,
          messages: response.messages
        }
      })
    })
  }
}

export const leaveChannel = (channel, id) => {
  return (dispatch) => {
    if (channel) {
      channel.leave();
    }

    dispatch({
      type: "USER_LEFT_CHANNEL",
      payload: id
    })
  }
}

export const composeMessage = (id, message) => {
  return {
    type: "COMPOSE_MESSAGE",
    payload: {
      id: id,
      message: message
    }
  }
}

export const createMessage = (channel, data) => {
  // set a pending when or before createMessage is called
  return (dispatch) => {
    // console.log('pushing message:' + data.text)
    channel.push("new_message", data)
    .receive("ok", (response) => {
      // change pending to success
    })
    .receive("error", (error) => {
      // change pending to error
    })
  }
}
