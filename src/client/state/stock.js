import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchStock = createAsyncThunk(
  'stock/fetchStock',
  async () => {
    const { data } = await axios.get('/api/stock')

    return data
  }
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
