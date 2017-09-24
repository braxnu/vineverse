export default (state = [], action) => {
  switch (action.type) {

    case 'DEPOSITS_SET':
      return action.payload.slice()

    default:
      return state
  }
}
