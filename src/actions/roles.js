import {batchActions} from 'redux-batched-actions';
import api from '../api';

export function listRoles(){
  return (dispatch) => {
    api.get('/roles')
      .then(({data}) => {
        dispatch({
          type: 'LOAD_ROLES',
          payload: data.data
        })
      })
      .catch((errors)=>{
        let error = errors.response.data.errors
        debugger;
      })
  }
}

export const addUserrole = (params) => {
  return (dispatch) => {
    api.post('/userroles', params)
      .then(({data}) => {
        dispatch({
          type: 'ADD_USER_ROLE',
          payload: data.data
        })
      })
      .catch((errors) => {
        debugger;
        // let error = errors.response.data.errors
      })
  }
}

export const deleteUserrole = (id) => {
  return (dispatch) => {
    api.delete(`/userroles/${id}`)
      .then(({data}) => {
        dispatch({
          type: 'DELETE_USER_ROLE',
          payload: id
        })
      })
      .catch((errors) => {
        debugger;
      })
  }
}

export const addRole = (params) => {
  // only add to store, api should only get updated in the addUserrole
  return {
    type: 'ADD_ROLE',
    payload: params
  }
}
