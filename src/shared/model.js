export default () => {
  const collection = []
  let id = 1

  return {
    list: filter => {
      if (!filter) return collection

      return collection.filter(item => {
        return Object.keys(filter).reduce((result, key) => {
          return result && item[key] === filter[key]
        }, true)
      })
    },

    create: record => {
      record.id = id++
      collection.push(record)
    }
  }
}
