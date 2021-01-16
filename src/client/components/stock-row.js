import React from 'react'
import PropTypes from 'prop-types'
import CreateOrder from './create-order'
import CreateFarm from './create-farm'

const StockRow = props => {
  const { plantsBySeed, product } = props

  return (
    <tr>
      <td>{product.name}</td>
      <td>{props.quantity}</td>
      <td>
        <CreateOrder {...props} />
      </td>
      <td>
        {plantsBySeed[product._id] && (
          <CreateFarm
            {...props}
            plant={plantsBySeed[product._id]}
          />
        )}
      </td>
    </tr>
  )
}

StockRow.propTypes = {
  product: PropTypes.object,
  quantity: PropTypes.number,
  plantsBySeed: PropTypes.object,
}

export default StockRow
