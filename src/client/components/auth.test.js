import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { Auth } from './auth'
import fakeApi from '../api'

jest.mock('../api', () => ({
  me: {
    get: jest.fn().mockReturnValue(new Promise(() => {})),
  },
}))

const FakeNotLoggedIn = () => <div />
const FakeChildren = () => <div className="chii" />

let wrapper
let fakeDispatchLogin

describe('initially', () => {
  beforeEach(() => {
    fakeDispatchLogin = jest.fn()

    act(() => {
      wrapper = mount(
        <Auth
          NotLoggedInComponent={FakeNotLoggedIn}
          isLoggedIn={false}
          dispatchLogin={fakeDispatchLogin}
        >
          <FakeChildren />
        </Auth>
      )
    })
  })

  it('renders the loading indicator', () => {
    expect(wrapper.text()).toContain('Loading')
  })

  it('requests user data to detect the auth status', () => {
    expect(fakeApi.me.get).toHaveBeenCalled()
  })
})

describe('when user is NOT authenticated', () => {
  beforeEach(async () => {
    fakeApi.me.get.mockRejectedValue(new Error('go away'))
    fakeDispatchLogin = jest.fn()

    wrapper = mount(
      <Auth
        NotLoggedInComponent={FakeNotLoggedIn}
        isLoggedIn={false}
        dispatchLogin={fakeDispatchLogin}
      >
        <FakeChildren />
      </Auth>
    )

    await new Promise(r => setTimeout(r, 0))
    wrapper.update()
  })

  it('renders the loading indicator', () => {
    expect(wrapper.find(FakeNotLoggedIn).exists()).toBe(true)
  })
})

describe('when user is authenticated', () => {
  beforeEach(async () => {
    fakeApi.me.get.mockResolvedValue({username: 'Roy Batty'})
    fakeDispatchLogin = jest.fn()

    wrapper = mount(
      <Auth
        NotLoggedInComponent={FakeNotLoggedIn}
        isLoggedIn
        dispatchLogin={fakeDispatchLogin}
      >
        <FakeChildren />
      </Auth>
    )

    await new Promise(r => setTimeout(r, 0))
    wrapper.update()
  })

  it('renders the children', async () => {
    expect(wrapper.find(FakeChildren).exists()).toBe(true)
  })
})
