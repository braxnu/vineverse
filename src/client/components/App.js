import React from 'react'
import Stock from './stock'
import Balance from './Balance'
import Username from './Username'
import Menu from './Menu'
import Orders from './orders'
import PlantsCache from './plants-cache'

const items = [
  {display: 'Strona główna', url: '/'},
  {display: 'Ceny', url: '/prices'}
]

const App = () => {
  return (
    <div className='App'>
      <Menu screenSize='desktop' items={items}/>
      <Username />
      <Balance />
      <Stock />

      <div className="row">
        <Orders side="buy" />
        <Orders side="sell" />
      </div>

      <PlantsCache />
    </div>
  )
}
export default App
