import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import postsData from '@/data/post.json';
import { BlogPost } from '@/types/blog';

interface BlogState {
  blogs: BlogPost[] | null;
}

const initialState: BlogState = {
  blogs: postsData,
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<BlogPost[]>) {
      console.log(action.payload);
      state.blogs = action.payload;
    },
    clearBlogs(state) {
      state.blogs = null;
    },
  },
});

export const { setBlogs, clearBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
