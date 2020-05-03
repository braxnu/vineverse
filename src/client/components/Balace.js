import React from 'react'

export default class Balance extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      balance: []
    }
  }
  
  componentDidMount() {
    fetch('/api/me', {
      method: 'GET'
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.state = data.balance
      })
  }

  render() {
    return <div className="App">Stan konta: {this.balance}</div>
  }
}
