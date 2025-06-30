import { configureStore } from '@reduxjs/toolkit';
import userReducers from './features/user/userSlice';
import blogReducers from './features/blogs/blogsSlice';
import gymReducers from './features/gym/gymSlice';

export const store = configureStore({
  reducer: {
    user: userReducers,
    blogs: blogReducers,
    gyms: gymReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
