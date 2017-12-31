import {batchActions} from 'redux-batched-actions';
import api from '../api';
import { Socket } from 'phoenix'

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
          type: 'LOAD_FEED',
          payload: data.feed
        },
        {
          type: 'SET_STATUS',
          payload: 'complete'
        },
        {
          type: "SET_LOGIN_STATUS",
          payload: {
            logged_in: true,
            loaded: true
          }
        }
      ]))
    })
    .catch((errors) => {
      debugger;
      let error = (errors && errors.response && errors.response.data && error) || "An error has occurred!";
      dispatch({
        type: 'SET_STATUS',
        payload: error
      })
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
        },
        {
          type: 'LOAD_FEED',
          payload: data.feed
        },
        {
          type: "SET_LOGIN_STATUS",
          payload: {
            logged_in: true,
            loaded: true
          }
        }
      ]))
    })
    .catch((errors) => {
      let error = (errors && errors.response && errors.response.data && errors.response.data.error) || "An error has occurred!";

      dispatch({
        type: "ADD_ERROR",
        payload: error
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
  /* add all clean-up here */
  return batchActions([
    {
      type: "CLEAR_USER"
    },
    {
      type: "CLEAR_FEED"
    },
    {
      type: "LOGOUT"
    },
    {
      type: "CLEAR_CHANNELS"
    }
  ])
}

/* LOAD USER or non-user */
export function setUser(token){
  return (dispatch) => {
    api.post('/sessions/refresh')
      .then(({data}) => {
        console.log('set user success')
        dispatch(batchActions([
          {
            type: "LOAD_FEED",
            payload: data.feed // this loads user specific feeds
          },
          {
            type: "LOAD_CHANNELS",
            payload: data.channels  // loads user subscribed channels
          },
          {
            type: "LOAD_USER",
            payload: data.data
          },
          {
            type: "SET_LOGIN_STATUS",
            payload: { logged_in: true }
          }
        ]))
      })
      .catch((errors)=>{
        debugger;
        console.log('set user error')
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

export const loadAllThings = () => {
  return (dispatch) => {
    api.get('/load')
    .then(({data}) => {
      dispatch(batchActions([
        {
          type: "LOAD_FEED",
          payload: data.feed // this loads projects_all
        },
        {
          type: "LOAD_CHANNELS",
          payload: data.channels // loads general channels
        },
        {
          type: "SET_LOGIN_STATUS",
          payload: { loaded: true }
        }
      ]))
    })
  }
}


/* websocket */
let api_url = process.env.REACT_APP_API_URL;
const WEBSOCKET_URL = api_url.replace(/(https|http)/,'ws').replace('/api/v1','')

export const connectToSocket = () => {
  return (dispatch) => {
    let token = localStorage.getItem('current_user')
    let socket = new Socket(`${WEBSOCKET_URL}/socket`, {
      params: { token },
      logger: (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data)
      }
    });
    socket.connect()
    dispatch({
      type: 'SOCKET_CONNECTED',
      payload: socket
    })
  }
}
