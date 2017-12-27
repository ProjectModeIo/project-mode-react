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

export const submitComment = (project_id, params) => {
  params.comment.project_id = project_id

  return (dispatch) => {
    api.post(`/comments`, params)
    .then(({data}) => {
      dispatch({
        type: "ADD_COMMENT",
        payload: data.data
      })
    })
    .catch((errors) => {
      let errMsg = ((error) => {
        switch(true) {
          case (error.data && error.data.message === "invalid_token"):
            return "You must be logged in"
          default:
            return "Something went wrong"
        }
      })(errors.response)

      dispatch({
        type: "ADD_ERROR",
        payload: errMsg
      })
    })
  }
}
