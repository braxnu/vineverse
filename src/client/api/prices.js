import axios from 'axios'

export const get = () => axios.get('/api/prices')
  .then(({ data }) => {
    return data
  })
