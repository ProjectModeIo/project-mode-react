let defaultState = {
  title: '',
  description: '',
  user_id: '',
  roles: [],
  skills: [],
  interests: [],
  comments: []
}
export const manageCurrentProject = (state=defaultState, action) => {
  switch (action.type) {
    case "LOAD_PROJECT":
      return Object.assign({}, state, action.payload)
    case "CLEAR_PROJECT":
      return defaultState
    case "ADD_PROJECT_ROLE":
      return Object.assign({}, state, {roles: [...state.roles, action.payload ]})
    case "ADD_PROJECT_SKILL":
      return Object.assign({}, state, {skills: [...state.skills, action.payload ]})
    case "ADD_PROJECT_INTEREST":
      return Object.assign({}, state, {interests: [...state.interests, action.payload ]})
    case "DELETE_PROJECT_ROLE":
      var newRoles = state.roles.filter((item) => {
        return item.id !== action.payload
      })
      return Object.assign({}, state, {roles: newRoles})
    case "DELETE_PROJECT_SKILL":
      var newSkills = state.skills.filter((item) => {
        return item.id !== action.payload
      })
      return Object.assign({}, state, {skills: newSkills})
    case "DELETE_PROJECT_INTEREST":
      var newInterests = state.interests.filter((item) => {
        return item.id !== action.payload
      })
      return Object.assign({}, state, {interests: newInterests})
    case "ADD_COMMENT":
      return Object.assign({}, state, { comments: [...state.comments, action.payload]})
    default:
      return state
  }
}
