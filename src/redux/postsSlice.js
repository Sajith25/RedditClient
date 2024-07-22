import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null
  },
  reducers: {
    fetchPostsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure
} = postsSlice.actions;

export default postsSlice.reducer;
