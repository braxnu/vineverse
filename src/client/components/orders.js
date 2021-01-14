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
  side,
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
        {list.map(o => <OrderRow key={o._id} {...o} />)}
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
  (state, ownProps) => ({
    list: state.orders.filter(o => o.side === ownProps.side),
  }),
  dispatch => ({
    fetchList: () => dispatch(fetchOrders()),
  })
)(Orders)
