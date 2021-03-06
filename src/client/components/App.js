import React from 'react'
import Stock from './Stock'
import Balance from './Balance'
import Prices from './Prices'
import Username from './Username'
import Menu from './Menu'

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
      <Prices />
    </div>
  )
}
export default App
