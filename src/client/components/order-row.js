import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fetchStock } from '../state/stock'
import { fetchBalance } from '../state/user'

const OrderRow = o => {
  const [quantity, setQuantity] = useState(1)

  return (
    <tr>
      <td>{o.ownerName}</td>
      <td>{o.product.name}</td>
      <td>{o.quantity}</td>
      <td>{o.price}</td>
      <td>
        <input
          value={quantity}
          size={String(o.quantity).length}
          type="number"
          max={o.quantity}
          min={1}
          onChange={ev => setQuantity(ev.target.value)}
        />
      </td>
      <td>
        <button
          onClick={async () => {
            await axios.post('/api/orders/sell', {
              orderId: o._id,
              quantity,
            })

            o.fetchBalance()
            o.fetchStock()
          }}
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
    fetchBalance: () => dispatch(fetchBalance()),
    fetchStock: () => dispatch(fetchStock()),
  })
)(OrderRow)
