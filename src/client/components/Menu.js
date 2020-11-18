import React, {useEffect,useState} from 'react'
import './Menu.css'

const Menu = props => {
  const [size, setSize] = useState('')
  const [items, setItems] = useState([])

  useEffect(()=> {
    setSize(props.screenSize)
    setItems(props.items)
  },[])

  const itemList = items.map(item => {
    return (
      <a href={item.url} key={item.display}>
        <div>{item.display}</div>
      </a>
    )
  })

  return (size === 'mobile') ?
    (<div className="mobile-nav">{itemList}</div>) :
    (<div className="desktop-nav">{itemList}</div>)

}
export default Menu