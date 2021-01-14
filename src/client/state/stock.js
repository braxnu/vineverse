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

export const selectQuantity = (state, product) => {
  const stock = state.stock
    .find(s => s.product._id === product._id)

  return stock.quantity
}

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
