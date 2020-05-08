import React, { Component } from 'react'
import axios from 'axios'

class Prices extends Component {
  constructor(props) {
    super(props)

    this.state = {
      prices: []
    }
  }
  componentDidMount() {
    axios.get('/api/prices')
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({prices: data})
      })
  }

  render() {
    const { prices } = this.state

    const tableStyle = {
      border: '1px solid black',
      borderCollapse: 'collapse'
    }
    return <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(price => (
            <tr key={price.name}>
              <td>{price.name}</td>
              <td>{price.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  }
}

export default Prices