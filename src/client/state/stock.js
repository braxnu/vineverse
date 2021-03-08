import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = []

export const fetchStock = createAsyncThunk(
  'stock/fetchStock',
  api.stock.get
)

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  extraReducers: {
    [fetchStock.fulfilled]: (state, {payload}) => {
      return payload
    }
  },
})

export default stockSlice.reducer
