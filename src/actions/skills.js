import {batchActions} from 'redux-batched-actions';
import api from '../api';

export function listSkills(){
  return (dispatch) => {
    api.get('/skills')
      .then(({data}) => {
        dispatch({
          type: 'LOAD_SKILLS',
          payload: data.data
        })
      })
      .catch((errors)=>{
        debugger;
      })
  }
}

export const addSkill = (params) => {
  // only add to store, api should only get updated in the addUserskill
  return {
    type: 'ADD_SKILL',
    payload: params
  }
}

/* USER SPECIFIC */
export const addUserskill = (params) => {
  return (dispatch) => {
    api.post('/userskills', params)
      .then(({data}) => {
        dispatch(batchActions([{
          type: 'ADD_USER_SKILL',
          payload: data.data
        },{
          type: 'LOAD_FEED',
          payload: data.feed
        }]))
      })
      .catch((errors) => {
        debugger;
        // let error = errors.response.data.errors
      })
  }
}

export const deleteUserskill = (id) => {
  return (dispatch) => {
    api.delete(`/userskills/${id}`)
      .then(({data}) => {
        dispatch(batchActions([{
          type: 'DELETE_USER_SKILL',
          payload: data.id
        },{
          type: 'LOAD_FEED',
          payload: data.feed
        }]))
      })
      .catch((errors) => {
        debugger;
      })
  }
}

/* PROJECT SPECIFC */
export const addProjectskill = (project_id, params) => {
  params.project_id = project_id;

  return (dispatch) => {
    api.post('/projectskills', params)
    .then(({data}) => {
      dispatch({
        type: 'ADD_PROJECT_SKILL',
        payload: data.data
      })
    })
    .catch((errors) => {
      debugger;
      // let error = errors.response.data.errors
    })
  }
}

export const deleteProjectskill = (id) => {
  return (dispatch) => {
    api.delete(`/projectskills/${id}`)
    .then(({data}) => {
      dispatch({
        type: 'DELETE_PROJECT_SKILL',
        payload: id
      })
    })
    .catch((errors) => {
      debugger;
    })
  }
}
