import React from 'react'

const Hello = () => {
  return (
    <div className='Hello'>
      <p>OK</p>
    </div>
  )
}
export default Hello

console.log(1)

export const DemoComponent = props => (
  <div>{props.name}</div>
)
