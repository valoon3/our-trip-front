import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  loginToggle: boolean;
  userInfo: UserInfo;
}

interface UserInfo {
  name: string;
  email: string;
}

const initialState: UserState = {
  loginToggle: false,
  userInfo: { name: '', email: '' },
};

const reducers = {
  login: (state: UserState) => {
    return {
      ...state,
      loginToggle: true,
    };
  },
  logout: () => {
    return {
      userInfo: {
        name: '',
        email: '',
      },
      loginToggle: false,
    };
  },
  setUserInfo: (state: UserState, action: PayloadAction<UserInfo>) => {
    return {
      ...state,
      userInfo: {
        name: action.payload.name,
        email: action.payload.email,
      },
    };
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const { login, logout, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
