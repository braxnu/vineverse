import axios from 'axios'

export const get = () => axios.get('/api/me')
  .then(({ data }) => {
    return data
  })
  .catch(err => {
    const status = err?.response?.status

    if (status !== 401) {
      console.log('login catch', { err })
      throw err
    }
  })

export const loginLocal = ({
  username,
  password,
}) => axios.post('/login/local', {
  username,
  password,
})
  .then(({ data }) => {
    return data
  })
  .catch(err => {
    console.log('login catch', { err })
    throw err
  })

export const logout = () => axios.post('/logout')

export const register = ({
  username,
  password,
}) => axios.post('/register', {
  username,
  password,
})
  .then(({ data }) => {
    return data
  })
  .catch(err => {
    console.log('register catch', { err })
    throw err
  })
