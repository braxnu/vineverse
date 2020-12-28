import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBalance } from '../state/user'

export class Balance extends React.Component {
  componentDidMount() {
    this.props.fetchBalance()
  }

  render() {
    return <div className="Balance">
      Stan konta: {this.props.balance}
    </div>
  }
}

Balance.propTypes = {
  balance: PropTypes.number,
  fetchBalance: PropTypes.func,
}

const mapStateToProps = state => ({
  balance: state.user.balance,
})

const mapDipatchToProps = dispatch => ({
  fetchBalance: () => dispatch(fetchBalance()),
})

export default connect(mapStateToProps, mapDipatchToProps)(Balance)
