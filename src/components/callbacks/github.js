import React, { Component } from 'react'
import api from '../../api';
import { queryParams }from '../../utilities';

export default class Github extends Component {
  /* this component opens in a new window */

  constructor(props) {
    super(props)
    this.state = {
      fromGithub: false
    }
  }

  componentWillMount() {
    window.addEventListener("message", (message)=>{
      if (message.data == "close") {
        window.close();
      }
    })

    if (this.props.location.search.includes("code")) {
      this.setState({ fromGithub: true })
      let params = queryParams.parse(this.props.location.search);

      api.post('/github_callback', {code: params.code})
      .then(({data}) => {
        document.cookie = `github_access_token=${data.access_token}`
        window.localStorage.setItem('github_access_token', data.access_token)
        window.opener.postMessage({
          access_token_from_oauth: data.access_token,
          account: data.account
        },"*")
      })
      .catch((errors) => {
        window.close();
      })
    }
  }

  render() {
    let goodAccess = "Thank you for authenticating Github!  Please wait..."
    let badAccess = "Looks like you took a wrong turn"
    return (
      <div>
        {this.state.fromGithub ? goodAccess:badAccess}
      </div>
    )
  }
}
