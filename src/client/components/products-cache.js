import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchProducts } from '../state/products'

const PlantsCache = ({fetchProducts}) => {
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <></>
  )
}

PlantsCache.propTypes = {
  fetchProducts: PropTypes.func,
}

export default connect(
  null,
  dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
  })
)(PlantsCache)
