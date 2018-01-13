import api from '../api';
import {batchActions} from 'redux-batched-actions';

export const addProject = (project_params) => {
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
          type: "ADD_PROJECT_TO_FEED",
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

export const loadProjectBySlug = (username, slug) => {
  return (dispatch) => {
    api.get(`/projectslug/${username}/${slug}`)
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

export const addWatch = (watched_params) => {
  return (dispatch) => {
    api.post('/watchedprojects', watched_params)
    .then(({data}) => {
      dispatch(batchActions([
        {
          type: "ADD_WATCH_TO_PROJECT",
          payload: data.data
        }
      ]))
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

export const addVolunteer = (project_id) => {
  return (dispatch) => {
    api.post('/volunteers', project_id)
    .then (({data}) => {
      dispatch(batchActions([
        {
          type: "ADD_VOLUNTEER_TO_PROJECT",
          payload: data.data
        }
      ]))
    })
    .catch((errors) => {
      debugger;
    })
  }
}

export const deleteVolunteer = (id) => {
  return (dispatch) => {
    api.delete(`/volunteers/${id}`)
      .then(({data}) => {
        dispatch(batchActions([{
          type: 'DELETE_PROJECT_VOLUNTEER',
          payload: id
        },{
          // type: 'LOAD_FEED',
          // payload: data.feed
        }]))
      })
      .catch((errors) => {
        debugger;
      })
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
