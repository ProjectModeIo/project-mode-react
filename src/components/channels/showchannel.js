import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { nameToSlug, slugToName } from '../../utilities'
import { loadCurrentChannel, clearCurrentChannel } from '../../actions/channel'

import RenderProjectList from '../projects/renderprojectlist'
import ChannelRoomPopup from './channelroom_popup'
import unionBy from 'lodash/unionBy';

class ShowChannel extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let { slug } = this.props.match.params
    this.props.loadCurrentChannel(slug);
  }

  componentWillReceiveProps(nextProps) {
    let thisSlug = this.props.match.params.slug
    let nextSlug = nextProps.match.params.slug
    if (nextSlug) {
      if (nextSlug !== thisSlug) {
        this.props.loadCurrentChannel(nextSlug);
      }
    }
  }

  componentWillUnmount() {
    this.props.clearCurrentChannel();
  }

  renderChat() {
    console.log('rendering chat');
    return (
      <ChannelRoomPopup
        id={this.props.currentChannel.id}
        />
    )
  }

  render() {
    /* variables */
    let { account } = this.props
    let { name, role, skill, interest, id } = this.props.currentChannel
    role = role || {}
    skill = skill || {}
    interest = interest || {}
    let channelProjs = unionBy(role.projects, skill.projects, interest.projects, "id")

    if (this.props.currentChannel.id) {
      return (
        <div className="index-page">
          <div className="main-content">
            <RenderProjectList title="All projects" list={channelProjs} account={account} />
          </div>
          <div className="sidebar">
            <h1>{name}</h1>
            {this.renderChat()}
          </div>
        </div>
      )
    } else {
      return (<div>Loading channel</div>)
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    status: state.manageStatus,
    account: state.manageAccount,
    currentChannel: state.manageChannels.currentChannel
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, loadCurrentChannel, clearCurrentChannel
  }, dispatch)
}

const ConnectedShowChannel = connect(mapStateToProps, mapDispatchToProps)(ShowChannel)

export default ConnectedShowChannel
