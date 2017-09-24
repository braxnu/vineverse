import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {
  render () {
    return (
      <div>{this.props.user.login}</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.auth
})

export default connect(mapStateToProps)(User)
