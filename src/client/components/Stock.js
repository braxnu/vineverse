import React from 'react'

export default class Stock extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stock: []
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/api/stock', {
      method: 'GET'
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({stock: data})
        console.log(data)
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
        <tbody>
          <tr><th>Name</th><th>Quantity</th></tr>
          <tr>
            <td>{stock.map(stock => <div key={stock.name}>{ stock.name }</div>)}</td>
            <td>{stock.map(stock => <div key={stock.quantity}>{ stock.quantity }</div>)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  }
}