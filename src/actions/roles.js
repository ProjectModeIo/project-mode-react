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
        debugger;
        // let error = errors.response.data.errors
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

/* USER SPECIFIC */

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

/* PROJECT SPECIFC */
export const addProjectrole = (project_id, params) => {
  params.project_id = project_id;

  return (dispatch) => {
    api.post('/projectroles', params)
    .then(({data}) => {
      dispatch({
        type: 'ADD_PROJECT_ROLE',
        payload: data.data
      })
    })
    .catch((errors) => {
      debugger;
      // let error = errors.response.data.errors
    })
  }
}

export const deleteProjectrole = (params) => {

}
