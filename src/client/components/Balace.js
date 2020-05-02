import React from 'react'

export default class Balance extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      me:[]
    }
  }
  
  componentDidMount() {
    fetch('http://localhost:3000/api/me', {
      method: 'GET'
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({balance: data})
        console.log(data)
      })
  }

  render() {
    const { me } = this.state

    return <div>

    </div>
  }
}