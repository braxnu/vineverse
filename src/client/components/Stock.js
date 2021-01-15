import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStock } from '../state/stock'
import StockRow from './stock-row'

const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
}

export function Stock ({stock, fetchStock}) {
  useEffect(() => {
    fetchStock()
  }, [])

  return <div>
    <table style={tableStyle}>
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Ilość</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {stock.map(stock => (
          <StockRow key={stock._id} {...stock} />
        ))}
      </tbody>
    </table>
  </div>
}

Stock.propTypes = {
  stock: PropTypes.array,
  fetchStock: PropTypes.func,
}

const mapStateToProps = state => ({
  stock: state.stock,
})

const mapDispatchToProps = dispatch => ({
  fetchStock: () => dispatch(fetchStock()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
