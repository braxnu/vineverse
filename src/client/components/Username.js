import PropTypes from 'prop-types'
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { logout } from '../state/user'
import './Username.css'

export const Username = ({ username, dispatchLogout }) => (
  <div className="Username">
    Zalogowany Użytkownik: {username}
    <button
      onClick={() => {
        axios.post('/logout')
          .then(dispatchLogout)
      }}
    >Logout</button>
  </div>
)

Username.propTypes = {
  username: PropTypes.string,
  dispatchLogout: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    username: state.user.username,
  }),
  dispatch => ({
    dispatchLogout: () => dispatch(logout())
  })
)(Username)
