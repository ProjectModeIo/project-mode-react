let defaultState = {
  currentChannel: {},
  allChannels: [],
  subscribedChannels: []
}

export const manageChannels = (state=defaultState, action) => {
  switch (action.type) {
    case "LOAD_CHANNELS":
      return Object.assign({}, state, action.payload)
    case "CLEAR_CHANNELS":
      return defaultState
    case "LOAD_CURRENT_CHANNEL":
      /* this should be hit by the route when you switch into channel page */
      return {...state, currentChannel: action.payload}
    case "LOAD_ALL_CHANNELS":
      /* this should be hit on load - maybe with listSkills,etc (move these from editProj to beginning) */
      return {...state, allChannels: action.payload}
    case "LOAD_SUBSCRIBED_CHANNELS":
      /* this should be loaded in setUser */
      return {...state, subscribedChannels: action.payload}
    default:
      return state
  }
}
