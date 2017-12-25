let defaultState = {
  email: '',
  firstname: '',
  lastname: '',
  id: '',
  roles: [],
  skills: [],
  interests: []
}
export const manageAccount = (state=defaultState, action) => {
  switch (action.type) {
    case "LOAD_USER":
      // debugger;
      return Object.assign({}, state, action.payload)
    case "CLEAR_USER":
      return defaultState
    case "ADD_USER_ROLE":
      return Object.assign({}, state, {roles: [...state.roles, action.payload ]})
    case "ADD_USER_SKILL":
      return Object.assign({}, state, {skills: [...state.skills, action.payload ]})
    case "ADD_USER_INTEREST":
      return Object.assign({}, state, {interests: [...state.interests, action.payload ]})
    case "DELETE_USER_ROLE":
      var newRoles = state.roles.filter((item) => {
        return item.id !== action.payload
      })
      return Object.assign({}, state, {roles: newRoles})
    case "DELETE_USER_SKILL":
      var newSkills = state.skills.filter((item) => {
        return item.id !== action.payload
      })
      return Object.assign({}, state, {skills: newSkills})
    case "DELETE_USER_INTEREST":
      var newInterests = state.interests.filter((item) => {
        return item.id !== action.payload
      })
      return Object.assign({}, state, {interests: newInterests})
    default:
      return state
  }
}
