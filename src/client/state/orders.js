import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchOrders = createAsyncThunk(
  'orders/fetch',
  async () => {
    const { data } = await axios.get('/api/orders')

    return data
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: {
    [fetchOrders.fulfilled]: (state, {payload}) => {
      return payload
    }
  },
})

export default ordersSlice.reducer
