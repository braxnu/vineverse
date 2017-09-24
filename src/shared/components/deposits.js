import React from 'react'
import { connect } from 'react-redux'
import { list } from '../actions/deposits'

class Deposits extends React.Component {
  componentWillMount() {
    this.props.list()
  }

  render () {
    if (this.props.deposits.length) {
      return (
        <div>
          <h2>Deposits</h2>
          <table>
            <tbody>
              {this.props.deposits.map((item, i) => (
                <tr key={i}>
                  <td>{item.plant.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Deposits</h2>
          No deposits
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  deposits: state.deposits
})

const mapDispatchToProps = dispatch => ({
  list: list(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Deposits)
