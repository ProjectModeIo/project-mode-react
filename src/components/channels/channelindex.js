import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import ListChannels from './listchannels'
import '../../styles/channels.css'

class ChannelIndex extends Component {

  render() {
    let { allChannels } = this.props.channels

    return (
      <div className="index-page">
        <div className="main-content">
          <h2>Channels</h2>
          (search by type / autocomplete)
          <ListChannels />
        </div>
        <div className="sidebar">
          sidebar
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    logged_in: state.manageLogin.logged_in,
    channels: state.manageChannels
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

const ConnectedChannelIndex = connect(mapStateToProps, mapDispatchToProps)(ChannelIndex)

export default ConnectedChannelIndex
