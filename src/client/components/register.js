import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isCorreect, setCorrect] = useState(false)

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
        disabled={!isCorreect}
        onClick={() => {
          axios.post('/register', {
            username,
            password,
          })
            .then(({data}) => {
              console.log({data})
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
