import React, {Component} from 'react';

const ListDisplay = (props) => {
  let { list, catName } = props
  let customProps = props.customProps || {}
  let customActions = props.customActions || {}
  let { listStyle, listClass, itemStyle, itemClass } = customProps
  let { itemClick, itemHover, attr } = customActions

  return (
    <div style={listStyle} className={listClass}>
      {list.map((item, index) => {
        let itemClickAction = itemClick ? itemClick.bind(this, item[attr]) : null;
        return (
          <ListDisplayItem
            key={index}
            item={item}
            customProps={{
              style: itemStyle,
              className: itemClass,
              click: itemClickAction,
            }}
            catName={catName}
            />
        )
      })}
    </div>
  )
}

const ListDisplayItem = (props) => {
  let { item, catName } = props
  let customProps = props.customProps || {}
  let { style, className, click } = customProps
  let clickAction = click ? click.bind(this) : null;

  return (
    <span style={style} className={className} onClick={clickAction}>
      {item[catName]}
    </span>
  )
}

export default ListDisplay
