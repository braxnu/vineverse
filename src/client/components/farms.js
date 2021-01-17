import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStock } from '../state/stock'
import StockRow from './stock-row'
import { fetchFarms } from '../state/farms'
import axios from 'axios'
import Harvest from './harvest'

const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
}

export function Farms ({
  farms,
  fetchFarms,
  plantsBySeed,
  productsById,
}) {
  useEffect(() => {
    fetchFarms()
  }, [])

  return <div>
    <table style={tableStyle}>
      <thead>
        <tr>
          <th>Typ</th>
          <th>Wielkość</th>
          <th>Wiek</th>
          <th>Plon</th>
        </tr>
      </thead>

      <tbody>
        {farms.map(farm => (
          <tr key={farm._id}>
            <td>{farm.plant.name}</td>
            <td>{farm.quantity}</td>
            <td>{farm.createdDate}</td>
            <td>
              {farm.isRipe && (
                <Harvest farm={farm} productsById={productsById} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

Farms.propTypes = {
  farms: PropTypes.array,
  plantsBySeed: PropTypes.object,
  productsById: PropTypes.object,
  fetchFarms: PropTypes.func,
}

export default connect(
  state => ({
    farms: state.farms,
    plantsBySeed: state.plants.reduce((acc, p) => ({
      ...acc,
      [p.seedId]: p,
    }), {}),
    productsById: state.products.reduce((acc, p) => ({
      ...acc,
      [p._id]: p,
    }), {}),
  }),
  dispatch => ({
    fetchFarms: () => dispatch(fetchFarms()),
  })
)(Farms)
