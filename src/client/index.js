import 'regenerator-runtime/runtime.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import App from './components/App'
import Auth from './components/auth'
import Login from './components/Login'
import { Provider } from 'react-redux'
import userReducer from './state/user'
import stockReducer from './state/stock'
import pricesReducer from './state/prices'

const store = configureStore({
  reducer: {
    user: userReducer,
    stock: stockReducer,
    prices: pricesReducer,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <Auth NotLoggedInComponent={Login}>
      <App />
    </Auth>
  </Provider>,
  document.getElementById('app')
)
