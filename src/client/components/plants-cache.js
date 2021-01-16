import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPlants } from '../state/plants'

const PlantsCache = ({fetchPlants}) => {
  useEffect(() => {
    fetchPlants()
  }, [])

  return (
    <></>
  )
}

PlantsCache.propTypes = {
  fetchPlants: PropTypes.func,
}

export default connect(
  null,
  dispatch => ({
    fetchPlants: () => dispatch(fetchPlants()),
  })
)(PlantsCache)
