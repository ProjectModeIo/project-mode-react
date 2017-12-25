let defaultState = {
  title: '',
  description: '',
  user_id: '',
  roles: [],
  skills: [],
  interests: []
}
export const manageCurrentProject = (state=defaultState, action) => {
  switch (action.type) {
    case "LOAD_PROJECT":
      return Object.assign({}, state, action.payload)
    case "CLEAR_PROJECT":
      return defaultState
    default:
      return state
  }
}
