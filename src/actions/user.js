import {batchActions} from 'redux-batched-actions';
import api from '../api';

export const editProfile = (params) => {
  return (dispatch) => {
    api.patch('/edituser', params)
    .then(({data}) => {
      dispatch({
        type: "LOAD_USER",
        payload: data.data
      })
    })
    .catch((errors) => {
      debugger;
    })
  }
}

export const loadCurrentProfile = (username) => {
  // debugger;
  return (dispatch) => {
    api.get(`/users/${username}`)
    .then(({data}) => {
      // debugger;
      dispatch({
        type: 'LOAD_CURRENT_PROFILE',
        payload: data
      })
    })
    .catch((errors) => {
      debugger;
    })
  }
}

export const clearCurrentProfile = () => {
  // debugger;
  return {
    type: 'CLEAR_CURRENT_PROFILE'
  }
}
