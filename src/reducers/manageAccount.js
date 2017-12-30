let defaultState = {
  email: '',
  firstname: '',
  lastname: '',
  id: '',
  roles: [],
  skills: [],
  interests: [],
  created_projects: []
}
export const manageAccount = (state=defaultState, action) => {
  switch (action.type) {
    case "LOAD_USER":
      let userdata = action.payload
      if (userdata.github_account_info && userdata.github_account_info.user_info_json) {
        userdata.github_account_info = JSON.parse(userdata.github_account_info.user_info_json)
      }
      return Object.assign({}, state, action.payload)
    case "CLEAR_USER":
      return defaultState
    case "ADD_USER_ROLE":
      return Object.assign({}, state, {roles: [...state.roles, action.payload ]})
    case "ADD_USER_SKILL":
      return Object.assign({}, state, {skills: [...state.skills, action.payload ]})
    case "ADD_USER_INTEREST":
      return Object.assign({}, state, {interests: [...state.interests, action.payload ]})
    case "ADD_USER_PROJECT":
      return Object.assign({}, state, {created_projects: [...state.created_projects, action.payload]})
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
    case "ADD_GITHUB_ACCOUNT":
      let user_info = JSON.parse(action.payload.account.user_info_json)
      return {...state,
        github_access_token: action.payload.access_token_from_oauth,
        github_account_info: user_info }
    default:
      return state
  }
}
