import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  loginToggle: boolean;
  name: string;
  email: string;
}

interface UserInfo {
  name: string;
  email: string;
}

const initialState: UserState = {
  loginToggle: false,
  name: '',
  email: '',
};

const reducers = {
  login: (state: UserState) => {
    state.loginToggle = true;
  },
  logout: (state: UserState) => {
    state.loginToggle = false;
    state.name = '';
    state.email = '';
  },
  setUserInfo: (state: UserState, action: PayloadAction<UserInfo>) => {
    state.name = action.payload.name;
    state.email = action.payload.email;
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const { login, logout, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
