import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
  username: '',
  balance: 0,
}

export const fetchBalance = createAsyncThunk(
  'users/fetchBalance',
  api.me.get
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, {payload}) {
      return {
        ...state,
        username: payload.username,
      }
    },
    logout(state) {
      return {
        ...state,
        username: '',
      }
    },
  },
  extraReducers: {
    [fetchBalance.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        balance: payload.balance,
      }
    },
  },
})

export const {
  login,
  logout,
} = userSlice.actions

export default userSlice.reducer
