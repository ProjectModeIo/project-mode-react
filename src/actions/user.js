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
