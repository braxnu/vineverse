import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchPrices = createAsyncThunk(
  'prices/fetch',
  async () => {
    const { data } = await axios.get('/api/prices')

    return data
  }
)

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  extraReducers: {
    [fetchPrices.fulfilled]: (state, {payload}) => {
      return payload
    }
  },
})

export default pricesSlice.reducer
