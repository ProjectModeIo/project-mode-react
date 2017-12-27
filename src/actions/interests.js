import {batchActions} from 'redux-batched-actions';
import { setUser } from './sessionsregistration'
import api from '../api';

export function listInterests(){
  return (dispatch) => {
    api.get('/interests')
      .then(({data}) => {
        dispatch({
          type: 'LOAD_INTERESTS',
          payload: data.data
        })
      })
      .catch((errors)=>{
        let error = errors.response.data.errors
        debugger;
      })
  }
}

export const addInterest = (params) => {
  // only add to store, api should only get updated in the addUserinterest
  return {
    type: 'ADD_INTEREST',
    payload: params
  }
}

/* USER SPECIFIC */
export const addUserinterest = (params) => {
  return (dispatch) => {
    api.post('/userinterests', params)
      .then(({data}) => {
        dispatch(batchActions([{
          type: 'ADD_USER_INTEREST',
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

export const deleteUserinterest = (id) => {
  return (dispatch) => {
    api.delete(`/userinterests/${id}`)
      .then(({data}) => {
        dispatch(batchActions([{
          type: 'DELETE_USER_INTEREST',
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
export const addProjectinterest = (project_id, params) => {
  params.project_id = project_id;

  return (dispatch) => {
    api.post('/projectcategories', params)
    .then(({data}) => {
      dispatch({
        type: 'ADD_PROJECT_INTEREST',
        payload: data.data
      })
    })
    .catch((errors) => {
      debugger;
      // let error = errors.response.data.errors
    })
  }
}

export const deleteProjectinterest = (id) => {
  return (dispatch) => {
    api.delete(`/projectcategories/${id}`)
    .then(({data}) => {
      dispatch({
        type: 'DELETE_PROJECT_INTEREST',
        payload: id
      })
    })
    .catch((errors) => {
      debugger;
    })
  }
}
