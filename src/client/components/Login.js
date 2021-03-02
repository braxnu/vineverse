import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Register from './register'
import api from '../api'

const Login = ({ dispatchLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <div>
        <input
          value={username}
          placeholder="Login"
          onChange={ev => setUsername(ev.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={ev => setPassword(ev.target.value)}
        />

        <button
          onClick={() => {
            api.me.loginLocal({
              username,
              password,
            })
              .then(data => {
                dispatchLogin(data.username)
              })
          }}
        >
          Login
        </button>
      </div>

      <Register />
    </>
  )
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
}

export default Login
