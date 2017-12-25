export const manageStatus = (state={}, action) => {
  switch (action.type) {
    case "SET_STATUS":
      return Object.assign({}, state, {status: action.payload})
    case "ADD_ERROR":
      return Object.assign({}, state, {error: action.payload})
    case "ADD_SUCCESS":
      return Object.assign({}, state, {success: action.payload})
    default:
      return state
  }
}
