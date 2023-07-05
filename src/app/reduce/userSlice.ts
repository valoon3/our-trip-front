import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  loginToggle: boolean;
  userInfo: { name: string; email: string };
}

const initialState: UserState = {
  loginToggle: false,
  userInfo: { name: '', email: '' },
};

const reducers = {
  login: (state: UserState) => {
    state.loginToggle = true;
  },
  logout: (state: UserState) => {
    state.loginToggle = false;
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
