import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: 1,
    user: null,
    loggedIn: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});
export const loginActions = userSlice.actions;
export const userReducer = userSlice.reducer;
