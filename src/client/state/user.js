import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  username: '',
  balance: 0,
}

export const fetchBalance = createAsyncThunk(
  'users/fetchBalance',
  async () => {
    const { data } = await axios.get('/api/me')

    return data
  }
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
} = userSlice.actions

export default userSlice.reducer
