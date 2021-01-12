import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { login } from '../state/user'


const Authenticated = ({
  children,
  isAuthenticated,
  renderNotAuthenticated,
  login,
}) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/me')
      .then(r => {
        login(r.data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return 'Loading...'
  }

  return isAuthenticated ? children : renderNotAuthenticated()
}

Authenticated.propTypes = {
  isAuthenticated: PropTypes.bool,
  renderNotAuthenticated: PropTypes.func,
  login: PropTypes.func,
}

const mapStateToProps = state => ({
  isAuthenticated: Boolean(state.user.username),
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated)
