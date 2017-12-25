import {batchActions} from 'redux-batched-actions';
import api from '../api';

/* register */

export const register = (user_params) => {
  return (dispatch) => {
    api.post('/users', { user: user_params })
    .then(({data}) => {
      window.localStorage.setItem("current_user", data.meta.token)
      dispatch(batchActions([
        {
          type: 'LOGIN',
          payload: data.meta.token
        },
        {
          type: 'LOAD_USER',
          payload: data.data
        },
        {
          type: 'SET_STATUS',
          payload: 'complete'
        }
      ]))
    })
    .catch((errors) => {
      debugger;
    })
  }
}

/* login */
export const login = (user_params) => {
  return(dispatch)=>{
    api.post('/sessions', { user: user_params})
    .then(({data}) => {
      window.localStorage.setItem("current_user", data.meta.token)
      dispatch(batchActions([
        {
          type: 'LOGIN',
          payload: data.meta.token
        },
        {
          type: 'LOAD_USER',
          payload: data.data
        }
      ]))
    })
    .catch((errors) => {
      debugger;
      dispatch({
        type: "ADD_ERROR",
        payload: errors.response.data.error
      })
      setTimeout(()=>{dispatch({
        type: "ADD_ERROR",
        payload: ""
      })}, 2000)
    })
  }
}

export const clearUser = () =>{
  return{
    type: "CLEAR_USER"
  }
}

export const logout = () => {
  window.localStorage.removeItem("current_user")
  // api.delete('/sessions')
  // .then(({data}) => {
  //   debugger;
  // })
  // .catch((errors) => {
  //   debugger;
  // })
  return{
    type: "LOGOUT"
  }
}

export function setUser(token){
  return (dispatch) => {
    api.post('/sessions/refresh')
      .then(({data}) => {
        console.log('set user success')
        dispatch({
          type: "LOAD_USER",
          payload: data.data
        })
      })
      .catch((errors)=>{
        console.log('set user error')
        debugger
        dispatch({
          type: "ADD_ERROR",
          payload: errors.response.data.error
        })
        setTimeout(()=>{dispatch({
          type: "ADD_ERROR",
          payload: ""
        })}, 2000)
      })
  }
}
