import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/auth'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      login: '',
      password: ''
    }
  }

  onChange = ev => {
    const { name, value } = ev.target

    this.setState({
      [name]: value
    })
  }

  onSubmit = ev => {
    const { login, password } = this.state

    ev.preventDefault()
    this.props.login(login, password)
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="login" onChange={this.onChange} />
        <input type="password" name="password" onChange={this.onChange} />
        <input type="submit" value="Log in" />
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: login(dispatch)
})

export default connect(null, mapDispatchToProps)(LoginForm)
