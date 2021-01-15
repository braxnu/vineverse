import React from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOrders } from '../state/orders'
import OrderRow from './order-row'

const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
}

const Orders = ({
  fetchList,
  list,
  stockQuantities,
  side,
}) => {
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <table style={tableStyle}>
      <caption>Oferty {side === 'buy' ? 'kupna' : 'sprzedaży'}</caption>
      <thead>
        <tr>
          <th>Gracz</th>
          <th>Produkt</th>
          <th className="amount">Ilość</th>
          <th className="amount">Cena</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {list.map(o =>
          <OrderRow
            key={o._id}
            {...o}
            stockQuantities={stockQuantities}
          />
        )}
      </tbody>
    </table>
  )
}

Orders.propTypes = {
  list: PropTypes.array,
  fetchList: PropTypes.func,
  side: PropTypes.oneOf(['buy', 'sell']),
}

export default connect(
  (state, ownProps) => {
    const list = state.orders
      .filter(o => o.side === ownProps.side)
      .sort((a, b) => a.price - b.price)

    if (ownProps.side === 'buy') {
      list.reverse()
    }

    const stockQuantities = state.stock.reduce((acc, s) => ({
      ...acc,
      [s.product._id]: s.quantity,
    }), {})

    return ({
      list,
      stockQuantities,
    })
  },
  dispatch => ({
    fetchList: () => dispatch(fetchOrders()),
  })
)(Orders)
