import React from 'react'
import axios from 'axios'
import styles from './Username.css'

export default class Username extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      username: ''
    }
  }
  
  componentDidMount() {
    axios.get('/api/me')
      .then(response => this.setState(response.data.username))
  }

  render() {
    return <div className="styles.Username">Zalogowany Użytkownik: {this.state.username}
    </div>
  }
}
