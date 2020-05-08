import React from 'react'
import axios from 'axios'

export default class Stock extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stock: []
    }
  }
  componentDidMount() {
    axios.get('/api/stock')
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({stock: data})
      })
  }

  render() {
    const { stock } = this.state

    const tableStyle = {
      border: '1px solid black',
      borderCollapse: 'collapse'
    }
    return <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Ilość</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(stock => (
            <tr key={stock.name}>
              <td>{stock.name}</td>
              <td>{stock.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  }
}