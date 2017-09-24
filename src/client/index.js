import * as d3 from 'd3'
import globe from './globe'
import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from '../shared/reducers'
import App from '../shared/components/app'

const canvas = d3.select('#globe').append('canvas')

globe(canvas, {
  width: document.documentElement.clientWidth / 2,
  height: document.documentElement.clientHeight / 2,
  datasetURI: '/world-110m.json'
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
)
