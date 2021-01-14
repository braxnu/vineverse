import React from 'react'
import Stock from './Stock'
import Balance from './Balance'
import Prices from './Prices'
import Username from './Username'
import Menu from './Menu'
import Orders from './orders'

const items = [
  {display: 'Strona główna', url: '/'},
  {display: 'Ceny', url: '/prices'}
]

const App = () => {
  return (
    <div className='App'>
      <Menu screenSize='desktop' items={items}/>
      <p>OK</p>
      <Username />
      <Balance />
      <Stock />
      <Prices />
      <Orders side="buy" />
      <Orders side="sell" />
    </div>
  )
}
export default App
