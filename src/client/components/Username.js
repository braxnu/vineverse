import PropTypes from 'prop-types'
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { login } from '../state/user'
import './Username.css'

export class Username extends React.Component {
  componentDidMount() {
    axios.get('/api/me')
      .then(response => this.props.login(response.data))
  }

  render() {
    return (
      <div className="Username">
        Zalogowany Użytkownik: {this.props.username}
      </div>
    )
  }
}

Username.propTypes = {
  username: PropTypes.string,
  login: PropTypes.func,
}

const mapStateToProps = state => ({
  username: state.user.username,
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Username)
