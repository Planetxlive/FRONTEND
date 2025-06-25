import { configureStore } from '@reduxjs/toolkit';
import userReducers from './features/user/userSlice';
import blogsReducers from './features/blogs/blogsSlice';

export const store = configureStore({
  reducer: {
    user: userReducers,
    blogs: blogsReducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
