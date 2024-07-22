import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      const data = await response.json();
      return data.data.children.map(post => post.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default postsSlice.reducer;
