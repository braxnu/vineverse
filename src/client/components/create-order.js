import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchOrders } from '../state/orders'
import { fetchStock } from '../state/stock'
import { fetchBalance } from '../state/user'

const CreateOrder = props => {
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(1)

  const execute = async ({side}) => {
    await axios.post('/api/orders', {
      stockId: props._id,
      quantity,
      side,
      price,
    })

    props.fetchOrders()
    props.fetchBalance()
    props.fetchStock()
  }

  return (
    <>
      <input
        value={quantity}
        title="Ilość"
        type="number"
        min={1}
        step={1}
        onChange={ev => setQuantity(ev.target.value)}
        className="quantity"
      />
      <input
        value={price}
        title="Cena"
        type="number"
        min={0.01}
        step={0.01}
        onChange={ev => setPrice(ev.target.value)}
        className="quantity"
      />
      <button onClick={() => execute({side: 'buy'})}>Kup</button>
      <button onClick={() => execute({side: 'sell'})}>Sprzedaj</button>
    </>
  )
}

CreateOrder.propTypes = {
  _id: PropTypes.string,
  product: PropTypes.object,
  fetchOrders: PropTypes.func,
  fetchBalance: PropTypes.func,
  fetchStock: PropTypes.func,
}

export default connect(
  null,
  dispatch => ({
    fetchOrders: () => dispatch(fetchOrders()),
    fetchBalance: () => dispatch(fetchBalance()),
    fetchStock: () => dispatch(fetchStock()),
  })
)(CreateOrder)
