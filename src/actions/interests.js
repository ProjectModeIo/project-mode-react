import {batchActions} from 'redux-batched-actions';
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

export const addUserinterest = (params) => {
  return (dispatch) => {
    api.post('/userinterests', params)
      .then(({data}) => {
        dispatch({
          type: 'ADD_USER_INTEREST',
          payload: data.data
        })
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
        dispatch({
          type: 'DELETE_USER_INTEREST',
          payload: id
        })
      })
      .catch((errors) => {
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
