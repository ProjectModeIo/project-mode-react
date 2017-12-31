import api from '../api';
import {batchActions} from 'redux-batched-actions';

export const loadCurrentChannel = (slug) => {
  return (dispatch) => {
    api.get(`/channelslug/${slug}`)
    .then(({data}) => {
      dispatch({
        type: 'LOAD_CURRENT_CHANNEL',
        payload: data.data
      })
    })
    .catch((errors) => {
      debugger;
    })
  }
}

export const clearCurrentChannel = () => {
  return {
    type: "CLEAR_CURRENT_CHANNEL"
  }
}
