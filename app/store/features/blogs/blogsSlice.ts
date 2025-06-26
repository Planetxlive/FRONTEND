import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import postsData from '@/data/post.json';
import { BlogPost } from '@/types/blog';

interface BlogState {
  blogs: BlogPost[] | null;
}

const initialState: BlogState = {
  blogs: [],
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
    deleteBlog(state, action: PayloadAction<string>) {
      state.blogs =
        state.blogs?.filter(post => post.id !== action.payload) || [];
    },
  },
});

export const { setBlogs, clearBlogs, deleteBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
