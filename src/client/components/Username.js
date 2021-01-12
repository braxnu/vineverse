import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import './Username.css'

export class Username extends React.Component {
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
}

const mapStateToProps = state => ({
  username: state.user.username,
})

export default connect(mapStateToProps)(Username)
