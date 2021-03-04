import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../state/user'
import api from '../api'

export const Auth = ({ isLoggedIn, children, NotLoggedInComponent, dispatchLogin }) => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    api.me.get()
      .then(data => {
        setLoading(false)
        dispatchLogin(data.username)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (isLoading) {
    return 'Loading...'
  }

  return (
    isLoggedIn
      ? children
      : <NotLoggedInComponent dispatchLogin={dispatchLogin} />
  )
}

Auth.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  NotLoggedInComponent: PropTypes.elementType.isRequired,
}

export default connect(
  state => ({
    isLoggedIn: Boolean(state.user.username),
  }),
  dispatch => ({
    dispatchLogin: username => dispatch(login({ username })),
  })
)(Auth)
