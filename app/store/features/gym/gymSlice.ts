import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gym } from '@/types/gym';

interface GymState {
  gyms: Gym[] | null;
}

const initialState: GymState = {
  gyms: [],
};

const gymSlice = createSlice({
  name: 'gyms',
  initialState,
  reducers: {
    setGyms(state, action: PayloadAction<Gym[]>) {
      console.log(action.payload);
      state.gyms = action.payload;
    },
    clearGyms(state) {
      state.gyms = null;
    },
  },
});

export const { setGyms, clearGyms } = gymSlice.actions;
export default gymSlice.reducer;
