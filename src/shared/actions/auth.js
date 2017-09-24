import axios from 'axios'

export const login = dispatch => {
  return (login, password) => {
    return axios.post('/api/login', {
      login,
      password
    })
    .then(response => {
      const { data: payload } = response

      dispatch({
        type: 'AUTH_LOGIN',
        payload
      })
    })
    .catch(error => console.error(error))
  }
}
