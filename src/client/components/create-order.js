import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStock } from '../state/stock'
import { async } from 'regenerator-runtime'
import axios from 'axios'

const CreateOrder = props => {
  const [quantity, setQuantity] = useState(1)

  const execute = async ({side}) => {
    await axios.post('/api/orders', {
      product: props.product,
      quantity,
      side,
    })
  }

  return (
    <div>
      <input
        value={quantity}
        size={String(quantity).length + 1}
        type="number"
        min={1}
        onChange={ev => setQuantity(ev.target.value)}
      />
      <button onClick={() => execute({side: 'buy'})}>Buy</button>
      <button onClick={() => execute({side: 'sell'})}>Sell</button>
    </div>
  )
}

CreateOrder.propTypes = {
  product: PropTypes.object,
}

export default CreateOrder
