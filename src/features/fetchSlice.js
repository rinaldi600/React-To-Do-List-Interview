import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'fetchSlice',
  initialState: {
    value: false
  },
  reducers: {
    getNewFetch: state => {
      state.value = true
    },
    stopNewFetch: state => {
      state.value = false
    },
  }
})

// Action creators are generated for each case reducer function
export const { getNewFetch, stopNewFetch } = counterSlice.actions

export default counterSlice.reducer