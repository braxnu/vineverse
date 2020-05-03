import React from 'react'

export default class Balance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: 0
    }
  }
  
  componentDidMount() {
    fetch('/api/me', {
      method: 'GET'
    })
      .then(response =>{
        return response.json()
      })
      .then(data => {
        this.setState(data)
      })
  }

  render() {
    return <div className="App">Stan konta: {this.state.balance} {' '}
    </div>
  }
}
