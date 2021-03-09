import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import api from '../api'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isCorrect, setCorrect] = useState(false)

  useEffect(() => {
    setCorrect(
      password &&
      (password === passwordConfirmation) &&
      username
    )
  }, [
    username,
    password,
    passwordConfirmation,
  ])

  return (
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

      <input
        type="password"
        value={passwordConfirmation}
        placeholder="Confirm password"
        onChange={ev => setPasswordConfirmation(ev.target.value)}
      />

      <button
        disabled={!isCorrect}
        onClick={() => {
          api.me.register({
            username,
            password,
          })
            .catch(err => {
              setCorrect(false)
              console.log('login catch', {err})
            })
        }}
      >
        Register
      </button>
    </div>
  )
}

Register.propTypes = {
}

export default Register
