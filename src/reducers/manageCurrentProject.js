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
    case "ADD_PROJECT_ROLE":
      return Object.assign({}, state, {roles: [...state.roles, action.payload ]})
    case "DELETE_PROJECT_ROLE":
      var newRoles = state.roles.filter((item) => {
        return item.id !== action.payload
      })
      return Object.assign({}, state, {roles: newRoles})
    default:
      return state
  }
}
