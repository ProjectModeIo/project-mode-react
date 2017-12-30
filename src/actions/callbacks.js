import api from '../api';

/*
  github oauth flow (wip):
  1) load user (which will load with access token if exists in database)
  2) if no token, check localstorage for access token.  if yes, go to step 8
  3) If does not exist, show button that will pop up github oauth
  4) Github oauth callback will go in the separate window with the code (setinterval will start waiting for access token to exist)
  5) sep window - that window will pass code to PM API which will return an access token
  6) sep window - save access token to local storage
  7) sep window - close window
  8) once the access token exists in localstorage, it'll add the access token state.

  if a request fails, clear localStorage/delete access token and re-authenticate

*/

export const addGithubAccount = (data) => {
  return {
    type: 'ADD_GITHUB_ACCOUNT',
    payload: data
  }
}
