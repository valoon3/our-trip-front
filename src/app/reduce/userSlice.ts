import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfoType } from '@/types/UserInfo.type';

interface UserState {
  loginToggle: boolean;
  userInfo: { name: string; email: string };
}

const initialState: UserState = {
  loginToggle: false,
  userInfo: { name: '', email: '' },
};

const reducers = {
  login: (state: UserState, action: PayloadAction<UserInfoType>) => {
    state.loginToggle = true;
    state.userInfo = action.payload;
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
