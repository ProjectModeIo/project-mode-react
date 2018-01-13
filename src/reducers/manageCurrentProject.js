let defaultState = {
  title: '',
  description: '',
  user_id: '',
  user: {},
  roles: [],
  skills: [],
  interests: [],
  comments: [],
  watchedprojects: [],
  volunteers: []
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
    case "ADD_WATCH_TO_PROJECT":
      let watchExists = false;
      let newWatchedArrays = state.watchedprojects.map(watch => {
        if (watch.id === action.payload.id) {
          watchExists = true;
          return action.payload
        } else {
          return watch;
        }
      })
      if (!watchExists) {
        newWatchedArrays.push(action.payload);
      }
      return {
        ...state,
        watchedprojects: newWatchedArrays
      }
    case "ADD_VOLUNTEER_TO_PROJECT":
      return {
        ...state,
        volunteers: [
          ...state.volunteers,
          action.payload
        ]
      }
    case "DELETE_PROJECT_VOLUNTEER":
      let newVolunteers = state.volunteers.filter(volunteers => {
        return volunteers.id !== action.payload
      })
      return {
        ...state,
        volunteers: newVolunteers
      }
    default:
      return state
  }
}
