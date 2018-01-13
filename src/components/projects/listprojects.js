import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { nameToSlug } from '../../utilities'

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
    let { title, description, watchedprojects, created_by, slug, interests } = this.props.item

    let time_ago_english = new javascript_time_ago('en-US')
    let inserted_at = time_ago_english.format(new Date(this.props.item.inserted_at))
    let updated_at = time_ago_english.format(new Date(this.props.item.updated_at))

    let account = this.props.account || {}
    /* auth stuff */
    let isProjectCreator = account.username === created_by
    let projectStatus = watchedprojects.reduce((acc, cur) => { return acc + cur.interestlevel}, 0)

    return (
      <div onClick={this.handleClick.bind(this)} className={`project-list_item ${isProjectCreator ? 'is-owner' : ''}`}>
        <div style={{position: 'absolute', left: 0, top: 0,
          padding: "20px", fontSize: "18px"}}>{projectStatus}</div>
        <Link to={`/u/${created_by}/${slug}`} >{title}</Link>
        <span className="project-list_meta-data project-list_meta-data-item">posted by <Link to={`/user/${created_by}`}>{created_by}</Link> {inserted_at}</span>
        <div>{description}</div>
        <span className="project-list_meta-data">
          tags: {interests.map(interest => {
            return (
              <span className="project-list_meta-data-item">
                <Link to={`/c/${nameToSlug(interest.name)}`}>
                  {interest.name}
                </Link>
              </span>
            )
          })}
        </span>
        <div>
          {this.state.expanded ? <div>EXPAND</div>:null}
        </div>
      </div>
    )
  }
}

export default ListProject
