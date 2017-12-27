let defaultState = {
    projects_interest_related: [], projects_role_related: [], projects_skill_related: [],
    projects_recommended: [], projects_all: []
  };

export const manageFeed = (state=defaultState, action) => {
  switch (action.type) {
    case "LOAD_FEED":
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
