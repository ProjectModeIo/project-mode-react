import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class ShowChannel extends Component {
  constructor(props) {
    super(props)

  }

  componentWillMount() {
    // this.props.loadCurrentChannel();
  }

  componentWillReceiveProps(nextProps) {
    // this.props.loadCurrentChannel();
  }

  componentWillUnmount() {
    // this.props.clearCurrentChannel();
  }

  render() {
    /* variables */

    return (
      <div>
        <h1>CHANNEL!!</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    status: state.manageStatus,
    account: state.manageAccount
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push
  }, dispatch)
}

const ConnectedShowChannel = connect(mapStateToProps, mapDispatchToProps)(ShowChannel)

export default ConnectedShowChannel
