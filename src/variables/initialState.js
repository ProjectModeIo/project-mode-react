const initialState = {
  manageAccount: {
    email: '',
    id: '',
    roles: [],
    skills: [],
    interests: [],
    created_projects: [],
    github_access_token: window.localStorage.getItem("github_access_token"),
    github_account_info: {}
  },
  manageCurrentProfile: {
    username: '',
    firstname: '',
    lastname: '',
    tagline: '',
    created_projects: [],
    roles: [],
    skills: [],
    interests: []
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
