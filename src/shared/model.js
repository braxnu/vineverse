export default () => {
  const collection = []

  return {
    list: filter => {
      if (!filter) return collection

      return collection.filter(item => {
        return Object.keys(filter).reduce((result, key) => {
          return result && item[key] === filter[key]
        }, true)
      })
    },

    create: record => collection.push(record)
  }
}
