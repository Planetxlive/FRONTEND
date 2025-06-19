import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from './types'

interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      console.log(action.payload)
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
})

export const { setUser, clearUser, updateUser } = userSlice.actions
export default userSlice.reducer