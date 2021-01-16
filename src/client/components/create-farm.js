import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchStock } from '../state/stock'

const CreateFarm = ({
  _id: stockId,
  plant,
  fetchStock,
}) => {
  const [quantity, setQuantity] = useState(1)

  const execute = async () => {
    await axios.post('/api/farms', {
      stockId,
      quantity,
      plantId: plant._id,
    })

    await fetchStock()
  }

  return (
    <>
      {plant.name}

      <input
        value={quantity}
        title="Ilość"
        size={1}
        type="number"
        min={1}
        step={1}
        onChange={ev => setQuantity(ev.target.value)}
        className="quantity"
      />

      <button onClick={() => execute()}>Stwórz</button>
    </>
  )
}

CreateFarm.propTypes = {
  _id: PropTypes.string,
  fetchStock: PropTypes.func,
  plant: PropTypes.object,
}

export default connect(
  null,
  dispatch => ({
    fetchStock: () => dispatch(fetchStock()),
  })
)(CreateFarm)
