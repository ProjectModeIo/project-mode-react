export const manageRoles = (state = [], action) => {
  switch (action.type) {
    case "LOAD_ROLES":
      return action.payload
    default:
      return state
  }
}
