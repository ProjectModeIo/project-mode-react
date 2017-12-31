let defaultRoom = {
  channel: null,
  info: {},
  messages: [],
  currentMessage: ''
}

let defaultState = {
  channels: {},
  /* channels: {
    [id]: defaultRoom
  }*/
  teams: {},
  convos: {}
}

export const manageRooms = (state=defaultState, action) => {
  switch (action.type) {
    case "CONNECTED_TO_CHANNEL":
      return { ...state,
        channels: {
          ...state.channels,
          [action.payload.id]: {
            channel: action.payload.channel,
            info: action.payload.room,
            messages: action.payload.messages.reverse(),
            currentMessage: ''
          }
        }
      }
    case "USER_LEFT_CHANNEL":
      return {...state,
        channels: {
          ...state.channels,
          [action.payload]: defaultRoom
        }
      }
    case "CHANNEL_MESSAGE_CREATED":
      // debugger;
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.payload.id]: {
            ...state.channels[action.payload.id],
            messages: [
              ...state.channels[action.payload.id].messages,
              action.payload.messages
            ]
          }
        }
      }
    case "COMPOSE_MESSAGE": //action.payload = { id: x, message: val }
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.payload.id]: {
            ...state.channels[action.payload.id],
            currentMessage: action.payload.message
          }
        }
      }
    case "RESET_MESSAGE": //action.payload = id
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.payload]: {
            ...state.channels[action.payload],
            currentMessage: ''
          }
        }
      }
    default:
      return state
  }
}
