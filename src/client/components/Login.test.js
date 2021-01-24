import React from 'react'
import Login from './Login'
import Enzyme, { mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new Adapter() })

it('renders a button', () => {
  const wrapper = mount(<Login />)

  expect(wrapper.find('button').exists()).toBe(true)
})


it('has a "Login" label', () => {
  const wrapper = mount(<Login />)

  expect(wrapper.find('button').text()).toBe('Login')
})


it('navigates to /login on click', () => {
  const wrapper = mount(<Login />)
  const button = wrapper.find('button')

  delete window.location
  delete global.location

  window.location = { assign: jest.fn() }
  global.location = window.location

  button.simulate('click')

  expect(window.location.assign).toHaveBeenCalledWith('/login')
})
