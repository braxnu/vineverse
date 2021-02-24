import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../state/user'
import axios from 'axios'

const Auth = ({ isLoggedIn, children, NotLoggedInComponent, dispatchLogin }) => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/me')
      .then(({data}) => {
        setLoading(false)
        dispatchLogin(data.username)
      })
      .catch(err => {
        setLoading(false)

        if (err?.response?.status !== 401) {
          console.log('login catch', { err })
        }
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
