import React, {Component} from 'react';
import { Link} from 'react-router-dom'

import FontAwesome from 'react-fontawesome'
import javascript_time_ago from 'javascript-time-ago'
javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')

const ListProject = (props) => {
  let { list, account } = props
  return (
    <div className="project-list_wrapper">
      {list.map((item, index) => {
        return (
          <ListProjectItem
            key={index}
            item={item}
            account={account}
            />
        )
      })}
    </div>
  )
}

class ListProjectItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false
    }
  }

  togglePreview() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleClick(event) {
    if (event.target.tagName.toLowerCase() !== 'a') {
      this.togglePreview()
    }
  }

  render() {
    let { title, description, created_by, slug } = this.props.item

    let time_ago_english = new javascript_time_ago('en-US')
    let inserted_at = time_ago_english.format(new Date(this.props.item.inserted_at))
    let updated_at = time_ago_english.format(new Date(this.props.item.updated_at))

    let account = this.props.account || {}
    /* auth stuff */
    let isProjectCreator = account.username === created_by

    return (
      <div onClick={this.handleClick.bind(this)} className={`project-list_item ${isProjectCreator ? 'is-owner' : ''}`}>
        <Link to={`/u/${created_by}/${slug}`} >{title}</Link>
        <span className="project-list_meta-data">posted by {created_by} {inserted_at}</span>
        <div>{description}</div>
        <div>
          {this.state.expanded ? <div>EXPAND</div>:null}
        </div>
      </div>
    )
  }
}

export default ListProject
