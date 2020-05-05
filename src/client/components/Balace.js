import React from 'react'
import axios from 'axios'

export default class Balance extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      balance: 0
    }
  }
  
  componentDidMount() {
    axios.get('/api/me')
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState(data)
      })
  }

  render() {
    return <div className="Balance">Stan konta: {this.state.balance} {' '}
    </div>
  }
}
