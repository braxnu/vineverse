import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchPlants = createAsyncThunk(
  'plants/fetch',
  async () => {
    const { data } = await axios.get('/api/plants')

    return data
  }
)

const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  extraReducers: {
    [fetchPlants.fulfilled]: (state, {payload}) => {
      return payload
    }
  },
})

export default plantsSlice.reducer
