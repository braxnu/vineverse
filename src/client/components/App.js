import React from 'react'
import Stock from './stock'
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

      <div className="row">
        <Orders side="buy" />
        <Orders side="sell" />
      </div>
    </div>
  )
}
export default App
