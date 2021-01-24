import React from 'react'
import Menu from './Menu'
import Enzyme, { mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new Adapter() })

it('renders a button', () => {
  const items = [
    {url: '/adin', display: 'Adin'},
    {url: '/dwa', display: 'Dwa'},
    {url: '/adin', display: 'Adin2'},
    {url: '/dwa', display: 'Dwa2'},
    {url: '/adin', display: 'Adin3'},
    {url: '/dwa', display: 'Dwa3'},
    {url: '/adin', display: 'Adin4'},
    {url: '/dwa', display: 'Dwa4'},
  ]

  const wrapper = mount(
    <Menu
      items={items}
      screenSize='mobile'
    />
  )

  expect(wrapper.html()).toMatchSnapshot()
})

it('renders all provided items', () => {
  const items = [
    {url: '/adin', display: 'Adin'},
    {url: '/dwa', display: 'Dwa'},
    {url: '/adin', display: 'Adin2'},
    {url: '/dwa', display: 'Dwa2'},
    {url: '/adin', display: 'Adin3'},
    {url: '/dwa', display: 'Dwa3'},
    {url: '/adin', display: 'Adin4'},
    {url: '/dwa', display: 'Dwa4'},
  ]

  const wrapper = mount(
    <Menu
      items={items}
      screenSize='mobile'
    />
  )

  expect(wrapper.find('a').length).toBe(items.length)
})
