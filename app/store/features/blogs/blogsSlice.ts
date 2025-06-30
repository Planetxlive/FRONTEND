import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import postsData from '@/data/post.json';
import { BlogPost } from '@/types/blog';

interface BlogState {
  blogs: BlogPost[] | null;
  userBlogs: BlogPost[] | null;
}

const initialState: BlogState = {
  blogs: [],
  userBlogs: [],
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<BlogPost[]>) {
      console.log(action.payload);
      state.blogs = action.payload;
    },
    setUserBlogs(state, action: PayloadAction<BlogPost[]>) {
      console.log('Setting user blogs:', action.payload);
      state.userBlogs = action.payload;
    },
    refreshBlog(state, action: PayloadAction<BlogPost>){
      state.blogs =
        state.blogs?.filter(post => post.id !== action.payload.id) || [];
      state.blogs.push(action.payload)

      state.userBlogs =
        state.userBlogs?.filter(post => post.id !== action.payload.id) || [];
      state.userBlogs.push(action.payload)
    },
    clearBlogs(state) {
      state.blogs = null;
    },
    clearUserBlogs(state) {
      state.userBlogs = null;
    },
    deleteBlog(state, action: PayloadAction<string>) {
      state.blogs =
        state.blogs?.filter(post => post.id !== action.payload) || [];
    },
    deleteUserBlog(state, action: PayloadAction<string>) {
      state.userBlogs =
        state.userBlogs?.filter(post => post.id !== action.payload) || [];
    },
  },
});

export const {
  setBlogs,
  setUserBlogs,
  clearBlogs,
  clearUserBlogs,
  deleteBlog,
  refreshBlog,
  deleteUserBlog,
} = blogsSlice.actions;
export default blogsSlice.reducer;
