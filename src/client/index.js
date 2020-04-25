import React from 'react'
import ReactDOM from 'react-dom'

class MainApp extends React.Component {
  render() {
    return (
      <div className='app'>
        <p>OK</p>
      </div>
    )
  }
}

ReactDOM.render(<MainApp />, document.getElementById('app'))

console.log(1)

export const DemoComponent = props => (
  <div>{props.name}</div>
)
