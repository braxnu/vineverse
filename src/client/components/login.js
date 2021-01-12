import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { login as loginAction } from '../state/user'

const Login = ({
  dispatchLogin,
}) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      Login
      <input value={login} onChange={ev => setLogin(ev.target.value)} />
      Password
      <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} />

      <button onClick={async () => {
        await axios.post('/auth', {login, password})
        dispatchLogin(await axios.get('/api/me').then(r => r.data))
      }}>
        Login
      </button>
    </div>
  )
}

Login.propTypes = {
  dispatchLogin: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  dispatchLogin: user => dispatch(loginAction(user)),
})

export default connect(null, mapDispatchToProps)(Login)
