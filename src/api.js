import axios from 'axios'
const API = process.env.REACT_APP_API_URL;

function headers() {
  const token = localStorage.getItem('current_user')

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // token: token,
    Authorization: `Bearer: ${token}`
  }
}

function parseResponse(response) {
  if (response.status >= 200 && response.status <= 210) {
    return response
  } else {
    debugger;
    return Promise.reject(response);
  }

  // return response.json().then((json) => {
  //   if (!response.ok) {
  //     return Promise.reject(json);
  //   }
  //   return json;
  // });
}

function queryString(params) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  get(url, params = {}) {
    return axios({
      method: 'get',
      url: `${API}${url}${queryString(params)}`,
      headers: headers()
    })
    .then(parseResponse);
  },

  post(url, data) {
    return axios({
      method: 'post',
      url: `${API}${url}`,
      data: data,
      headers: headers()
    })
    .then(parseResponse)
  },

  patch(url, data) {
    return axios({
      method: 'patch',
      url: `${API}${url}`,
      data:data,
      headers:headers()
    })
    .then(parseResponse)
  },

  delete(url) {
    return axios({
      method: 'delete',
      url: `${API}${url}`,
      headers: headers()
    })
    .then(parseResponse)
  }
}
