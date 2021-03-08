import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = []

export const fetchPrices = createAsyncThunk(
  'stock/fetchPrices',
  api.prices.get
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
