import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Register from './register'

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
            axios.post('/login/local', {
              username,
              password,
            })
              .then(({data}) => {
                dispatchLogin(data.username)
              })
              .catch(err => {
                console.log('login catch', {err})
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
