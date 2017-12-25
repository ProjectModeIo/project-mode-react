import api from '../api';

export const addProject = (project_params) => {
  return (dispatch) => {
    api.post('/projects', { project: project_params })
    .then(({data}) => {
      dispatch({
        type: 'LOAD_PROJECT',
        payload: data.data
      })
    })
    .catch((errors) => {
      debugger;
    })
  }
}
