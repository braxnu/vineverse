import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBalance } from '../state/user'
import formatter from 'format-number'

const format = formatter({round: 2})

export class Balance extends React.Component {
  componentDidMount() {
    this.props.fetchBalance()
  }

  render() {
    return <div className="Balance">
      Stan konta: ${format(this.props.balance)}
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
