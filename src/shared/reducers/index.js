import { combineReducers } from 'redux'
import auth from './auth'
import deposits from './deposits'

export default combineReducers({
  auth,
  deposits
})
