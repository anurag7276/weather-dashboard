
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  units: 'metric', 
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleUnits: (state) => {
      state.units = state.units === 'metric' ? 'imperial' : 'metric';
    },
  },
});

export const { toggleUnits } = settingsSlice.actions;
export default settingsSlice.reducer;