import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './components/Hello'
ReactDOM.render(<Hello />, document.getElementById('app'))

console.log(1)

export const DemoComponent = props => (
  <div>{props.name}</div>
)
