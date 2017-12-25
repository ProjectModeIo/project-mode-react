let defaultState=[]

export const manageInterests = (state=defaultState, action) => {
  switch (action.type) {
    case "LOAD_INTERESTS":
      return action.payload
    case "ADD_INTEREST":
      return [...state, action.payload]
    default:
      return state
  }
}
