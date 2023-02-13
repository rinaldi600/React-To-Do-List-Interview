import { configureStore } from '@reduxjs/toolkit'
import fetchSlice from './features/fetchSlice'

export default configureStore({
  reducer: {
    fetchSlice
  }
})