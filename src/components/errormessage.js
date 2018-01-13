import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom'
import { push } from 'react-router-redux'

const ErrorDisplay = (props) => {
  let { error } = props
  return (
    <div style={{position: "fixed", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "#eee"}}>{error}</div>
  )
}

class ErrorMessage extends Component {
  displayError(error) {
    switch(error) {
      case "You must be logged in":
        // return <ErrorDisplay error={error} />
      case "Something went wrong":
        return <ErrorDisplay error={error} />
      default:
        return null
    }
  }

  render() {
    let { error } = this.props.status
    if (error) {
      return this.displayError(error)
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    status: state.manageStatus
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push
  }, dispatch)
}

const ConnectedErrorMessage = connect(mapStateToProps, mapDispatchToProps)(ErrorMessage)

export default ConnectedErrorMessage
