import React from 'react'
import Stock from './Stock'
import Balance from './Balance'
import Prices from './Prices'
import Username from './Username'

const App = () => {
  return (
    <div className='App'>
      <p>OK</p>
      <Username />
      <Balance />
      <Stock />
      <Prices />
    </div>
  )
}
export default App