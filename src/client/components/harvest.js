import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStock } from '../state/stock'
import { fetchFarms } from '../state/farms'
import axios from 'axios'

const Harvest = ({
  farm,
  productsById,
  fetchFarms,
  fetchStock,
}) => {
  const [cropIndex, setCropIndex] = useState(0)

  return (
    <>
      <select onChange={ev => { setCropIndex(ev.target.value) }}>
        {farm.plant.crops.map((crop, i) => (
          <option
            key={crop._id}
            value={i}
          >
            {productsById[crop.productId]?.name}
          </option>
        ))}
      </select>

      <button
        onClick={async () => {
          await axios.post('/api/farms/harvest', {
            farmId: farm._id,
            cropIndex,
          })

          fetchFarms()
          fetchStock()
        }}
      >
        Zbierz
      </button>
    </>
  )
}

Harvest.propTypes = {
  farm: PropTypes.object,
  productsById: PropTypes.object,
  fetchFarms: PropTypes.func,
  fetchStock: PropTypes.func,
}

export default connect(
  null,
  dispatch => ({
    fetchFarms: () => dispatch(fetchFarms()),
    fetchStock: () => dispatch(fetchStock()),
  })
)(Harvest)
