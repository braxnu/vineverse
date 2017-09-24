import axios from 'axios'

export const list = dispatch => {
  return () => {
    return Promise.all([
      axios.get('/api/deposits'),
      axios.get('/api/plants')
    ])
    .then(([depositsRes, plantsRes]) => [
      depositsRes.data,
      plantsRes.data
    ])
    .then(([deposits, plants]) => {
      const plantMap = plants.reduce((result, item) => {
        result[item.id] = item
        return result
      }, {})

      deposits.forEach(item => {
        item.plant = plantMap[item.plantId]
      })

      dispatch({
        type: 'DEPOSITS_SET',
        payload: deposits
      })
    })
    .catch(error => console.error(error))
  }
}
