import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchFarms = createAsyncThunk(
  'farms/fetch',
  async () => {
    const { data } = await axios.get('/api/farms')

    return data
  }
)

const farmsSlice = createSlice({
  name: 'farms',
  initialState,
  extraReducers: {
    [fetchFarms.fulfilled]: (state, {payload}) => {
      return payload
    }
  },
})

export default farmsSlice.reducer
