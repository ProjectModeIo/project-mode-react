let defaultState = { token: '',
  logged_in: false,
  loaded: false
};

export const manageLogin = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { token: action.payload }
    case "LOGOUT":
      return defaultState
    case "SET_LOGIN_STATUS":
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
