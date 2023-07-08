import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  loginToggle: boolean;
  userInfo: { name: string; email: string };
}

const initialState: UserState = {
  loginToggle: false,
  userInfo: { name: '', email: '' },
};

const reducers = {
  login: (state: UserState, action: PayloadAction<any>) => {
    return { ...state, loginToggle: true, userInfo: action.payload };
  },
  logout: (state: UserState) => {
    return { ...state, loginToggle: false };
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
