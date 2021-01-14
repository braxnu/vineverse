import React from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOrders } from '../state/orders'

const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
}

const Orders = ({
  fetchList,
  list,
}) => {
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th>Gracz</th>
          <th>Produkt</th>
          <th>Ilość</th>
          <th>Cena</th>
        </tr>
      </thead>
      <tbody>
        {list.map(o => (
          <tr key={o._id}>
            <td>{o.ownerName}</td>
            <td>{o.product.name}</td>
            <td>{o.quantity}</td>
            <td>{o.price}</td>
          </tr>
        ))}
      </tbody>d
    </table>
  )
}

Orders.propTypes = {
  list: PropTypes.array,
  fetchList: PropTypes.func,
  side: PropTypes.oneOf(['buy', 'sell']),
}

export default connect(
  (state, ownProps) => ({
    list: state.orders.filter(o => o.side === ownProps.side),
  }),
  dispatch => ({
    fetchList: () => dispatch(fetchOrders()),
  })
)(Orders)
