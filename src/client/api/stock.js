import axios from 'axios'

export const get = () => axios.get('/api/stock')
  .then(({ data }) => {
    return data
  })
