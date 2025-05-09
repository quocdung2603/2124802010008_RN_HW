// slices/userSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  uid: string;
  email: string;
}

const initialState: UserState | null = null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => action.payload,
    logout: () => null,
  },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
