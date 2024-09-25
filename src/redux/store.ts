import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './slices/category-slice'
import tagSlice from './slices/tag-slice'
import postSlice from './slices/post-slice'

const store = configureStore({
  reducer: {
    category: categorySlice,
    tag: tagSlice,
    post: postSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
