import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fetchOrders } from '../state/orders'
import { fetchStock } from '../state/stock'
import { fetchBalance } from '../state/user'

const OrderRow = o => {
  const [quantity, setQuantity] = useState(1)

  const execute = async () => {
    await axios.post(`/api/orders/${o.side === 'buy' ? 'sell' : 'buy'}`, {
      orderId: o._id,
      quantity,
    })

    o.fetchBalance()
    o.fetchStock()
    o.fetchOrders()
  }

  return (
    <tr>
      <td>{o.ownerName}</td>
      <td>{o.product.name}</td>
      <td
        className="amount"
        onClick={() => {
          if (o.side === 'buy') {
            setQuantity(Math.min(o.quantity, o.stockQuantities[o.product._id]))
          } else {
            setQuantity(o.quantity)
          }
        }}
      >
        {o.quantity}
      </td>
      <td className="amount">{o.price}</td>
      <td>
        <input
          value={quantity}
          type="number"
          max={o.quantity}
          min={1}
          onChange={ev => setQuantity(ev.target.value)}
          onKeyDown={ev => {
            if (ev.key === 'Enter') {
              execute()
            }
          }}
          className="quantity"
        />
      </td>
      <td>
        <button
          onClick={execute}
        >
          {o.side === 'buy' ? 'Sprzedaj' : 'Kup'}
        </button>
      </td>
    </tr>
  )
}

export default connect(
  null,
  dispatch => ({
    fetchOrders: () => dispatch(fetchOrders()),
    fetchBalance: () => dispatch(fetchBalance()),
    fetchStock: () => dispatch(fetchStock()),
  })
)(OrderRow)
