import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPrices } from '../state/prices'

const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
}

class Prices extends Component {
  componentDidMount() {
    this.props.dispatchFetchPrices()
  }

  render() {
    const { prices } = this.props

    return <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(price => (
            <tr key={price.name}>
              <td>{price.name}</td>
              <td>{price.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  }
}

Prices.propTypes = {
  prices: PropTypes.array,
  fetchPrices: PropTypes.func,
}

export default connect(
  state => ({
    prices: state.prices,
  }),
  dispatch => ({
    dispatchFetchPrices: () => dispatch(fetchPrices()),
  })
)(Prices)
