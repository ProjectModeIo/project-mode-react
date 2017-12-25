let defaultState = { token: '' };

export const manageLogin = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {token: action.payload}
    case "LOGOUT":
      return defaultState
    default:
      return state
  }
}
