let defaultState = {
  username: '',
  firstname: '',
  lastname: '',
  tagline: '',
  created_projects: [],
  roles: [],
  skills: [],
  interests: []
}

export const manageCurrentProfile = (state=defaultState, action) => {
  switch (action.type) {
    case "LOAD_CURRENT_PROFILE":
      let userdata = action.payload
      if (userdata.github_account_info && userdata.github_account_info.user_info_json) {
        userdata.github_account_info = JSON.parse(userdata.github_account_info.user_info_json)
      }
      // debugger;
      return Object.assign({}, state, userdata)
    case "CLEAR_CURRENT_PROFILE":
      return defaultState
    default:
      return state
  }
}
