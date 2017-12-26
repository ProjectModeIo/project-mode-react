import api from '../api';
import {batchActions} from 'redux-batched-actions';

export const addProject = (project_params) => {
  return (dispatch) => {
    api.post('/projects', { project: project_params })
    .then(({data}) => {
      window.localStorage.setItem("project_in_progress", JSON.stringify(data.data))
      dispatch(batchActions([
        {
          type: 'LOAD_PROJECT',
          payload: data.data
        },
        {
          type: 'ADD_USER_PROJECT',
          payload: data.data
        }
      ]))
    })
    .catch((errors) => {
      debugger;
    })
  }
}

export const loadInProgressProject = (json) => {
  return(dispatch) => {
    api.get(`/projects/${JSON.parse(json).id}`)
    .then(({data}) => {
      dispatch({
        type: 'LOAD_PROJECT',
        payload: data.data
      })
    })
    .catch((errors) => {
      debugger;
      return {
        type: 'LOAD_PROJECT',
        payload: JSON.parse(json)
      }
    })
  }
}

export const loadProject = (id) => {
  return(dispatch) => {
    api.get(`/projects/${id}`)
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

export const loadProjectBySlug = (slug) => {
  return (dispatch) => {
    api.get(`/projectslug/${slug}`)
    .then(({data}) => {
      debugger;
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

export const clearProject = () =>{
  window.localStorage.removeItem("project_in_progress");
  return{
    type: "CLEAR_PROJECT"
  }
}
