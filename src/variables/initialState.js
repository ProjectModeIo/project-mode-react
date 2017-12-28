const initialState = {
  manageAccount: {
    email: '',
    id: '',
    roles: [],
    skills: [],
    interests: [],
    created_projects: [],
  },
  manageFeed: {
    projects_interest_related: [],
    projects_role_related: [],
    projects_skill_related: [],
    projects_recommended: [],
    projects_all: []
  },
  manageChannels: {
    currentChannel: {},
    allChannels: [],
    subscribedChannels: []
  },
  manageCurrentProject: {
    title: '',
    description: '',
    roles: [],
    skills: [],
    interests: [],
    comments: []},
  manageLogin: {
    token: window.localStorage.getItem("current_user"),
    logged_in: false,
    loaded: false
  },
  manageRoles: [],
  manageSkills: [],
  manageInterests: [],
  manageStatus: {
    status: '',
    error: '',
    success: '' }
}

export default initialState
