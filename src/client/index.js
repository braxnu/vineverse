import 'regenerator-runtime/runtime.js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './state/user'
import stockReducer from './state/stock'
import pricesReducer from './state/prices'
import ordersReducer from './state/orders'
import Authenticated from './components/authenticated'
import Login from './components/login'

const store = configureStore({
  reducer: {
    user: userReducer,
    stock: stockReducer,
    prices: pricesReducer,
    orders: ordersReducer,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <Authenticated renderNotAuthenticated={() => <Login />}>
      <App />
    </Authenticated>
  </Provider>,
  document.getElementById('app')
)
