import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStock } from '../state/stock'
import CreateOrder from './create-order'

const StockRow = props => {
  return (
    <tr>
      <td>{props.product.name}</td>
      <td>{props.quantity}</td>
      <td>
        <CreateOrder {...props} />
      </td>
    </tr>
  )
}

StockRow.propTypes = {
  product: PropTypes.object,
  quantity: PropTypes.number,
}

export default StockRow
