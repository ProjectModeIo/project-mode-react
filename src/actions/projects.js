import api from '../api';
import {batchActions} from 'redux-batched-actions';

export const addProject = (project_params) => {
  debugger;
  return (dispatch) => {
    api.post('/projects', { project: project_params })
    .then(({data}) => {
      debugger;
      window.localStorage.removeItem("project_in_progress")
      // remove in progress and load as current project
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
      /* should already be saved locally */
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

/* github stuff - move later */
export const github = (data) => {
  let githubData = {
    project_id: 3,
    repo: "corkly-react",
    user: "mwei2509"
  }
  return (dispatch) => {
    api.post('/github', githubData)
    .then(({data}) => {
      debugger;
    })
    .catch((errors) => {
      debugger;
    })
  }
}
