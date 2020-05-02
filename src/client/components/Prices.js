import React, { Component } from 'react';

class Prices extends Component {
  constructor(props) {
    super(props)

    this.state = {
      prices: []
    }
  }
  componentDidMount() {
      //czego tutaj nie dajemy localhost?
    fetch('/api/prices', {
      method: 'GET'
    })//czy czasem nie jest tak że jak wezmiesz w jednej linijce to jest automatycznie return?
      .then(response => {
        return response.json()
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
          {prices.map(prices => (
            <tr key={prices.name}>
              <td>{prices.name}</td>
              <td>{prices.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  }
}

export default Prices;