import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const { data } = await axios.get('/api/products')

    return data
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [fetchProducts.fulfilled]: (state, {payload}) => {
      return payload
    }
  },
})

export default productsSlice.reducer
