import React from 'react'
import './Menu.css'

const Menu = props => {
  const itemList = props.items.map(item => (
    <a href={item.url} key={item.display}>
      <div>{item.display}</div>
    </a>
  ))
  return (props.screenSize === 'mobile') ?
    (<div className="mobile-nav">{itemList}</div>) :
    (<div className="desktop-nav">{itemList}</div>)
}
export default Menu