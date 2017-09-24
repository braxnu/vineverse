import axios from 'axios'

export const getMe = dispatch => () => {
  return axios.get('/api/users/me')
  .then(response => {
    const { data: payload } = response

    dispatch({
      type: 'AUTH_LOGIN',
      payload
    })
  })
  .catch(error => console.error(error))
}
