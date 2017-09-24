import React from 'react'
import { connect } from 'react-redux'
import User from './user'
import Deposits from './deposits'
import LoginForm from './login-form'
import { getMe } from '../actions/users'

class App extends React.Component {
  componentWillMount() {
    this.props.updateLoginStatus()
  }

  render () {
    if (this.props.loggedIn) {
      return (
        <div>
          <User />
          <Deposits />
        </div>
      )
    } else {
      return (
        <LoginForm />
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  loggedIn: !!state.auth.login
})

const mapDispatchToProps = dispatch => ({
  updateLoginStatus: getMe(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
