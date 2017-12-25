let defaultState=[]

export const manageSkills = (state=defaultState, action) => {
  switch (action.type) {
    case "LOAD_SKILLS":
      return action.payload
    case "ADD_SKILL":
      return [...state, action.payload]
    default:
      return state
  }
}
