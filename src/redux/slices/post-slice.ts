import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../uxcomic-types'

interface PostState {
  list: Post[]
  selected?: Post
  filtered: Post[]
}

const initialState: PostState = {
  list: [],
  filtered: [],
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.list = action.payload
    },
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selected = action.payload
    },
    selectPostsByTagAndCategory: (
      state,
      action: PayloadAction<{ tagId: string; categoryId: string }>
    ) => {
      const { tagId, categoryId } = action.payload
      state.filtered = state.list.filter(
        (post) => post.tagId === tagId && post.categoryId === categoryId
      )
    },
  },
})

export const { setPosts, setSelectedPost, selectPostsByTagAndCategory } =
  postSlice.actions

export default postSlice.reducer
